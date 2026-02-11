const Pagination = ({ paginationData, setPage }) => {
    const { page, totalPages } = paginationData;
    
    if (totalPages <= 1) return null;

    const handlePageChange = (newPage) => {
        console.log(newPage)
        if (newPage >= 1 && newPage <= totalPages) {
            console.log("Page change triggered", newPage)
            setPage(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        
        pages.push(
            <button
                key={1}
                onClick={() => handlePageChange(1)}
                className={`px-3 py-1 rounded-lg transition ${
                    page === 1 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
                1
            </button>
        );

        if (totalPages <= 5) {
            for (let i = 2; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-3 py-1 rounded-lg transition ${
                            page === i 
                                ? 'bg-blue-600 text-white shadow-sm' 
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            if (page <= 4) {
                for (let i = 2; i <= Math.min(4, totalPages); i++) {
                    pages.push(
                        <button
                            key={i}
                            onClick={() => handlePageChange(i)}
                            className={`px-3 py-1 rounded-lg transition ${
                                page === i 
                                    ? 'bg-blue-600 text-white shadow-sm' 
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {i}
                        </button>
                    );
                }
                if (totalPages > 5) {
                    pages.push(<span key="dots1" className="px-1 text-gray-400">...</span>);
                }
                pages.push(
                    <button
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className={`px-3 py-1 rounded-lg transition ${
                            page === totalPages 
                                ? 'bg-blue-600 text-white shadow-sm' 
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {totalPages}
                    </button>
                );
            } else if (page >= totalPages - 3) {
                pages.push(<span key="dots2" className="px-1 text-gray-400">...</span>);
                for (let i = totalPages - 3; i < totalPages; i++) {
                    pages.push(
                        <button
                            key={i}
                            onClick={() => handlePageChange(i)}
                            className={`px-3 py-1 rounded-lg transition ${
                                page === i 
                                    ? 'bg-blue-600 text-white shadow-sm' 
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {i}
                        </button>
                    );
                }
                pages.push(
                    <button
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className={`px-3 py-1 rounded-lg transition ${
                            page === totalPages 
                                ? 'bg-blue-600 text-white shadow-sm' 
                                : 'text-gray-400 hover:bg-gray-100'
                        }`}
                    >
                        {totalPages}
                    </button>
                );
            } else {
                pages.push(<span key="dots3" className="px-1 text-gray-400">...</span>);
                
                for (let i = page - 2; i < page; i++) {
                    pages.push(
                        <button
                            key={i}
                            onClick={() => handlePageChange(i)}
                            className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                        >
                            {i}
                        </button>
                    );
                }
                
                pages.push(
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className="px-3 py-1 rounded-lg bg-blue-600 text-white shadow-sm transition"
                    >
                        {page}
                    </button>
                );
                
                for (let i = page + 1; i <= Math.min(page + 2, totalPages); i++) {
                    pages.push(
                        <button
                            key={i}
                            onClick={() => handlePageChange(i)}
                            className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                        >
                            {i}
                        </button>
                    );
                }
                
                if (page + 2 < totalPages - 1) {
                    pages.push(<span key="dots4" className="px-1 text-gray-400">...</span>);
                }
                
                if (page + 2 < totalPages) {
                    pages.push(
                        <button
                            key={totalPages}
                            onClick={() => handlePageChange(totalPages)}
                            className={`px-3 py-1 rounded-lg transition ${
                                page === totalPages 
                                    ? 'bg-blue-600 text-white shadow-sm' 
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {totalPages}
                        </button>
                    );
                }
            }
        }

        return pages;
    };

    return (
        <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-2 bg-white shadow-md rounded-xl px-4 py-2">
                <button
                    onClick={() => handlePageChange(parseInt(page) - 1)}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-lg transition ${
                        page === 1 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    Prev
                </button>

                {renderPageNumbers()}

                <button
                    onClick={() => handlePageChange(parseInt(page) + 1)}
                    disabled={page === totalPages}
                    className={`px-3 py-1 rounded-lg transition ${
                        page === totalPages 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    Next
                </button>
            </nav>
        </div>
    );
};

export default Pagination;