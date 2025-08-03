import React, { useState, useEffect, useCallback, useMemo } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  increment,
} from "firebase/firestore";
import useHotel from "../hooks/useHotel";
import StockSummary from "../components/stockSummary";
import StockTakeForm from "../components/StockTakeForm";
import StockTakeTable from "../components/StockTakeTable";
import { generatePDF, generateCSV } from "../utils/pdfUtils";

// Custom hook for fetching categories
const useCategories = (hotelId) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!hotelId) {
      setLoading(false);
      return;
    }
    
    const q = query(collection(db, `hotels/${hotelId}/categories`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching categories:", error);
      setLoading(false);
    });
    
    return unsubscribe;
  }, [hotelId]);
  
  return { categories, loading };
};

// Custom hook for fetching stock items
const useStockItems = (hotelId) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!hotelId) {
      setLoading(false);
      return;
    }
    
    const q = query(collection(db, `hotels/${hotelId}/stockItems`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching stock items:", error);
      setLoading(false);
    });
    
    return unsubscribe;
  }, [hotelId]);
  
  return { items, loading };
};

const StocktakePage = () => {
  const { hotelId } = useHotel();
  const { categories, loading: categoriesLoading } = useCategories(hotelId);
  const { items, loading: itemsLoading } = useStockItems(hotelId);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  
  // Memoized sorted categories
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => a.name.localeCompare(b.name));
  }, [categories]);
  
  // Memoized grouped items
  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      const cat = item.category || "Uncategorized";
      acc[cat] = acc[cat] || [];
      acc[cat].push(item);
      return acc;
    }, {});
  }, [items]);
  
  // Memoized totals
  const { totalCost, totalRevenue, totalProfit } = useMemo(() => {
    let cost = 0, revenue = 0;
    items.forEach(({ quantity, unitPrice, sold, sellingPrice }) => {
      cost += (quantity || 0) * (unitPrice || 0);
      revenue += (sold || 0) * (sellingPrice || 0);
    });
    return {
      totalCost: cost,
      totalRevenue: revenue,
      totalProfit: revenue - cost
    };
  }, [items]);
  
  // Show feedback message
  const showFeedback = useCallback((message, type = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
  }, []);
  
  // Add new item
  const handleAddItem = useCallback(async (newItem) => {
    if (!hotelId) return;
    
    try {
      await addDoc(collection(db, `hotels/${hotelId}/stockItems`), newItem);
      setShowForm(false);
      showFeedback('Item added successfully!');
    } catch (error) {
      console.error("Error adding item:", error);
      showFeedback('Failed to add item', 'error');
    }
  }, [hotelId, showFeedback]);
  
  // Bulk restock
  const handleBulkRestock = useCallback(async (itemId, addedQuantity) => {
    if (!hotelId || !itemId || !addedQuantity) return;
    
    try {
      const itemRef = doc(db, `hotels/${hotelId}/stockItems`, itemId);
      await updateDoc(itemRef, {
        quantity: increment(Number(addedQuantity)),
      });
      showFeedback('Stock updated successfully!');
    } catch (error) {
      console.error("Error updating stock:", error);
      showFeedback('Failed to update stock', 'error');
    }
  }, [hotelId, showFeedback]);
  
  // Update item
  const handleUpdateItem = useCallback(async (updatedItem) => {
    if (!hotelId || !updatedItem.id) return;
    
    try {
      const itemRef = doc(db, `hotels/${hotelId}/stockItems`, updatedItem.id);
      await updateDoc(itemRef, updatedItem);
      setEditingItem(null);
      setShowForm(false);
      showFeedback('Item updated successfully!');
    } catch (error) {
      console.error("Error updating item:", error);
      showFeedback('Failed to update item', 'error');
    }
  }, [hotelId, showFeedback]);
  
  // Delete item
  const handleDeleteItem = useCallback(async (item) => {
    if (!hotelId || !item.id) return;
    
    try {
      const itemRef = doc(db, `hotels/${hotelId}/stockItems`, item.id);
      await deleteDoc(itemRef);
      if (editingItem?.id === item.id) {
        setEditingItem(null);
        setShowForm(false);
      }
      showFeedback('Item deleted successfully!');
    } catch (error) {
      console.error("Error deleting item:", error);
      showFeedback('Failed to delete item', 'error');
    }
  }, [hotelId, editingItem, showFeedback]);
  
  // Add item inline
  const handleAddItemInline = useCallback(async (newItem) => {
    await handleAddItem(newItem);
  }, [handleAddItem]);
  
  // Form submission handler
  const onSubmit = useCallback(async (itemData, isBulk = false) => {
    if (editingItem && !isBulk) {
      await handleUpdateItem({ ...editingItem, ...itemData });
    } else if (isBulk && editingItem) {
      const addedQuantity = parseInt(itemData.quantity, 10);
      await handleBulkRestock(editingItem.id, addedQuantity);
      clearEdit();
    } else {
      await handleAddItem(itemData);
    }
  }, [editingItem, handleUpdateItem, handleBulkRestock, handleAddItem]);
  
  // Clear editing state
  const clearEdit = useCallback(() => {
    setEditingItem(null);
    setShowForm(false);
  }, []);
  
  // Export to PDF
  const handleExportPDF = useCallback(() => {
    const columns = ["Category", "Item", "Qty", "Remaining", "Supplier", "Unit Price", "Selling Price", "Sold"];
    const data = [];
    
    sortedCategories.forEach((cat) => {
      data.push([cat.name, "", "", "", "", "", "", "", ""]);
      (groupedItems[cat.name] || []).forEach((item) => {
        const rem = (item.quantity || 0) - (item.sold || 0);
        data.push([
          "",
          item.itemName || item.name || "",
          item.quantity || 0,
          rem,
          item.supplier || "",
          `KES ${(item.unitPrice || 0).toLocaleString()}`,
          `KES ${(item.sellingPrice || 0).toLocaleString()}`,
          item.sold || 0,
        ]);
      });
    });
    
    data.push(["", "", "", "", "", "", "", "", ""]);
    data.push([
      "Totals", 
      "", 
      "", 
      "", 
      "", 
      `KES ${totalCost.toLocaleString()}`, 
      `KES ${totalRevenue.toLocaleString()}`, 
      ""
    ]);
    data.push([
      "Profit", 
      "", 
      "", 
      "", 
      "", 
      "", 
      "", 
      `KES ${totalProfit.toLocaleString()}`
    ]);
    
    generatePDF("Stock Report", columns, data, "stock_report.pdf");
    showFeedback('PDF exported successfully!');
  }, [sortedCategories, groupedItems, totalCost, totalRevenue, totalProfit, showFeedback]);
  
  // Export to CSV
  const handleExportCSV = useCallback(() => {
    const csvData = [];
    
    sortedCategories.forEach((cat) => {
      csvData.push([cat.name]);
      (groupedItems[cat.name] || []).forEach((item) => {
        const rem = (item.quantity || 0) - (item.sold || 0);
        csvData.push([
          item.itemName || item.name || "",
          item.quantity || 0,
          rem,
          item.supplier || "",
          item.unitPrice || 0,
          item.sellingPrice || 0,
          item.sold || 0,
        ]);
      });
    });
    
    csvData.push(["Totals", "", "", "", "", totalCost, totalRevenue, ""]);
    csvData.push(["", "", "", "", "", "", "", "Profit", totalProfit]);
    
    generateCSV(csvData, "stock_report.csv");
    showFeedback('CSV exported successfully!');
  }, [sortedCategories, groupedItems, totalCost, totalRevenue, totalProfit, showFeedback]);
  
  // Toggle form visibility
  const toggleForm = useCallback(() => {
    setShowForm(prev => !prev);
    if (editingItem) {
      setEditingItem(null);
    }
  }, [editingItem]);
  
  // Edit item
  const handleEditItem = useCallback((item) => {
    setEditingItem(item);
    setShowForm(true);
  }, []);
  
  // Loading state
  if (categoriesLoading || itemsLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          <p>Loading stock data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <main style={styles.container}>
      <StockSummary items={items} />
      
      {feedback.message && (
        <div style={{
          ...styles.feedback,
          backgroundColor: feedback.type === 'error' ? '#fee' : '#f0fff4',
          color: feedback.type === 'error' ? '#c53030' : '#38a169',
        }}>
          {feedback.message}
        </div>
      )}
      
      {!editingItem && (
        <button
          onClick={toggleForm}
          style={styles.addButton}
          aria-label={showForm ? "Cancel add new item form" : "Open add new item form"}
        >
          {showForm ? "Cancel" : "➕ Add New Item"}
        </button>
      )}
      
      {(showForm || editingItem) && (
        <div style={styles.formContainer}>
          <StockTakeForm
            categories={categories}
            onSubmit={onSubmit}
            editingItem={editingItem}
            clearEdit={clearEdit}
          />
        </div>
      )}
      
      {items.length > 0 && categories.length > 0 && (
        <div style={styles.tableContainer}>
          <div style={styles.exportButtons}>
            <button onClick={handleExportCSV} style={styles.exportBtn}>
              Export CSV
            </button>
            <button onClick={handleExportPDF} style={styles.exportBtn}>
              Export PDF
            </button>
          </div>
          <StockTakeTable
            items={items}
            categories={categories}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            onAddItemInline={handleAddItemInline}
            onBulkRestock={handleBulkRestock}
          />
        </div>
      )}
      
      {items.length === 0 && (
        <div style={styles.emptyState}>
          <p>No stock items found. Click "Add New Item" to get started.</p>
        </div>
      )}
    </main>
  );
};

const styles = {
  container: {
    padding: "1rem",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
  loadingSpinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "1rem",
  },
  addButton: {
    padding: "0.75rem 1.25rem",
    margin: "1rem 0",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 6px rgba(79, 70, 229, 0.1)",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  formContainer: {
    marginBottom: "1.5rem",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  tableContainer: {
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  exportButtons: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
    justifyContent: "flex-end",
  },
  exportBtn: {
    padding: "0.6rem 1.2rem",
    cursor: "pointer",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    backgroundColor: "#4299e1",
    color: "#fff",
    transition: "all 0.3s ease",
    fontSize: "0.9rem",
    boxShadow: "0 2px 5px rgba(66, 153, 225, 0.3)",
  },
  feedback: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    fontWeight: "500",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  emptyState: {
    textAlign: "center",
    padding: "2rem",
    color: "#718096",
    fontSize: "1.1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  // Animation keyframes
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  }
};

export default StocktakePage;