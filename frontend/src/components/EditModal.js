import {useState, useEffect} from "react";
import { api } from "../api/axios";

const EditModal = ({selectedContact, setShowEditModal, setSelectedContact, fetchContacts}) => {
    
    const [editContact, setEditContact] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'Lead',
        notes: ''
    });
    
    const [formErrors, setFormErrors] = useState({});

    const fetchSelectedContact = async ()=>{
        try{
            let res = await api.get(`/contacts/${selectedContact._id}`);
            setEditContact(res.data.contact)
        }catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        fetchSelectedContact();
    }, [selectedContact]);

    const handleEditContact =async () => {
        const errors = validateContact(editContact);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
          try{
            let res = await api.put(`/contacts/${selectedContact._id}`,editContact);
            console.log("Contact Updated Successfuly");
        }catch(err){
            console.log(err);
        }
        setShowEditModal(false);
        setSelectedContact(null);
        setFormErrors({});
        fetchContacts();
    };

    const validateContact = (contact) => {
        const errors = {};
        if (!contact.name.trim()) errors.name = 'Name is required';
        if (!contact.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
            errors.email = 'Email is invalid';
        }
        if (!contact.phone.trim()) errors.phone = 'Phone is required';
        return errors;
    };

    const handleCloseModal = (e) => {
        if (e.target.classList.contains('fixed')) {
            setShowEditModal(false);
            setSelectedContact(null);
        }
    };

    // Add ESC key support
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                setShowEditModal(false);
                setSelectedContact(null);
            }
        };
        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={handleCloseModal}
        >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            
            {/* Modal */}
            <div className="relative z-50 bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Edit Contact
                    </h3>
                    <button
                        onClick={() => {
                            setShowEditModal(false);
                            setSelectedContact(null);
                        }}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-4 md:p-6">
                    <div className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name *
                            </label>
                            <input
                                type="text"
                                id="edit-name"
                                value={editContact.name}
                                onChange={(e) => setEditContact({...editContact, name: e.target.value})}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter full name"
                            />
                            {formErrors.name && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                            )}
                        </div>
                        
                        {/* Email Field */}
                        <div>
                            <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="edit-email"
                                value={editContact.email}
                                onChange={(e) => setEditContact({...editContact, email: e.target.value})}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter email address"
                            />
                            {formErrors.email && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                            )}
                        </div>
                        
                        {/* Phone Field */}
                        <div>
                            <label htmlFor="edit-phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone *
                            </label>
                            <input
                                type="text"
                                id="edit-phone"
                                value={editContact.phone}
                                onChange={(e) => setEditContact({...editContact, phone: e.target.value})}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter phone number"
                            />
                            {formErrors.phone && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                            )}
                        </div>
                        
                        {/* Company Field */}
                        <div>
                            <label htmlFor="edit-company" className="block text-sm font-medium text-gray-700 mb-1">
                                Company
                            </label>
                            <input
                                type="text"
                                id="edit-company"
                                value={editContact.company}
                                onChange={(e) => setEditContact({...editContact, company: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter company name"
                            />
                        </div>
                        
                        {/* Status Field */}
                        <div>
                            <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                id="edit-status"
                                value={editContact.status}
                                onChange={(e) => setEditContact({...editContact, status: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Lead">Lead</option>
                                <option value="Prospect">Prospect</option>
                                <option value="Customer">Customer</option>
                            </select>
                        </div>
                        
                        {/* Notes Field */}
                        <div>
                            <label htmlFor="edit-notes" className="block text-sm font-medium text-gray-700 mb-1">
                                Notes
                            </label>
                            <textarea
                                id="edit-notes"
                                value={editContact.notes}
                                onChange={(e) => setEditContact({...editContact, notes: e.target.value})}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add any additional notes..."
                            />
                        </div>
                    </div>
                </div>

                {/* Footer with Buttons */}
                <div className="flex justify-end gap-3 p-4 border-t">
                    <button
                        onClick={() => {
                            setShowEditModal(false);
                            setSelectedContact(null);
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleEditContact}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;