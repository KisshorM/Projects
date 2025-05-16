import React, { useState } from 'react';
import Create from "./Create";
import Delete from "./Delete";
import View from "./View";
import Filter from "./Filter";
import Edit from "./Edit";

function Admin() {
    const [op, setOp] = useState("Create");

    const renderComponent = () => {
        switch(op) {
            case "Create": return <Create />;
            case "Edit": return <Edit />;
            case "Delete": return <Delete />;
            case "View": return <View />;
            case "Filter": return <Filter />;
            default: return <div>Select an option</div>;
        }
    }

    return (
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h2 style={{
                color: '#333',
                borderBottom: '2px solid #eee',
                paddingBottom: '10px',
                marginBottom: '20px'
            }}>
                Admin Dashboard
            </h2>
            
            <select 
                value={op}
                onChange={(e) => setOp(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    marginBottom: '20px',
                    width: '200px'
                }}
            >
                <option value="Create">Create Student</option>
                <option value="Edit">Edit Student</option>
                <option value="View">View Student</option>
                <option value="Delete">Delete Student</option>
                <option value="Filter">Filter Students</option>
            </select>
            
            <div style={{
                padding: '20px',
                border: '1px solid #eee',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9',
                textAlign: 'center'
            }}>
                {renderComponent()}
            </div>
        </div>
    );
}

export default Admin;