import {useEffect} from "react";
import { api } from "../api/axios";
const DeleteModal = ({selectedContact, setShowDeleteModal, setSelectedContact, setContacts, contacts}) => {
    
    const handleDeleteContact = async () => {
        try{
            let res = await api.delete(`/contacts/${selectedContact._id}`);
             setContacts(contacts.filter(contact => contact._id !== selectedContact._id));
            setShowDeleteModal(false);
            setSelectedContact(null);
        }catch(err){
            console.log("Error in deleteing", err)
        }
    };

    const handleCloseModal = (e) => {
        if (e.target.classList.contains('fixed')) {
            setShowDeleteModal(false);
            setSelectedContact(null);
        }
    };

    // Add ESC key support
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                setShowDeleteModal(false);
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
            <div className="relative z-50 bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                {/* Content */}
                <div className="p-4 md:p-6">
                    <div className="flex flex-col items-center text-center">
                        {/* Warning Icon */}
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <svg 
                                className="h-6 w-6 text-red-600" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                                />
                            </svg>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Delete Contact
                        </h3>
                        
                        {/* Message */}
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">
                                Are you sure you want to delete{' '}
                                <span className="font-medium text-gray-900">{selectedContact?.name}</span>?
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer with Buttons */}
                <div className="flex justify-end gap-3 p-4 border-t">
                    <button
                        onClick={() => {
                            setShowDeleteModal(false);
                            setSelectedContact(null);
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteContact}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;