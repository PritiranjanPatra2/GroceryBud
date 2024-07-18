import React, { useState } from 'react';
import './GroceryBud.css';

function GroceryBud() {
    const [grocery, setGrocery] = useState([]);
    const [input, setInput] = useState("");
    const [checkedItems, setCheckedItems] = useState({});
    const [notification, setNotification] = useState({ message: '', type: '' });

    function showNotification(message, type) {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 3000);
    }

    function groceryvalue() {
        if (input === '') {
            showNotification('Please Provide Value', 'error');
            return;
        }
        setGrocery([...grocery, input]);
        setInput("");
        showNotification('Item Added To The List', 'success');
    }

    function handleCheckboxChange(index) {
        setCheckedItems(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }

    function deleteItem(index) {
        setGrocery(grocery.filter((_, i) => i !== index));
        showNotification('Item Deleted', 'success');
    }

    return (
        <div>
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
            <div className="container">
                <h1 className="title">Grocery Bud</h1>
                <div className="input-container">
                    <input 
                        type="text"  
                        value={input} 
                        onChange={(event) => setInput(event.target.value)} 
                        className="input-field"
                    />
                    <button onClick={groceryvalue} className="add-button">Add Item</button>
                </div>
                {grocery.map((item, index) => {
                    return (
                        <div key={index} className="grocery-item">
                            <input 
                                type="checkbox" 
                                checked={checkedItems[index] || false} 
                                onChange={() => handleCheckboxChange(index)} 
                                className="checkbox"
                            />
                            <p className={checkedItems[index] ? 'item-text strikethrough' : 'item-text'}>{item}</p>
                            <button 
                                onClick={() => deleteItem(index)} 
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GroceryBud;
