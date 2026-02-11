const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">CRM</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2024 CRM Dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;