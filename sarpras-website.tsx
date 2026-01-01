<!doctype html>
<html lang="id">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistem Inventaris Sarana Prasarana</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: #1f2937;
    }

    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
      width: 100%;
    }

    /* Navbar */
    .navbar {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 1rem 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .navbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .navbar-title {
      font-size: 1.5rem;
      font-weight: bold;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .navbar-user {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    /* Buttons */
    .btn {
      padding: 0.625rem 1.25rem;
      border: none;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .btn:active {
      transform: translateY(0);
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .btn-danger {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }

    .btn-secondary {
      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
      color: white;
    }

    .btn-logout {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 2px solid #ef4444;
    }

    .btn-logout:hover {
      background: #ef4444;
      color: white;
    }

    .btn-icon {
      padding: 0.5rem;
      min-width: 36px;
      justify-content: center;
    }

    /* Login Page */
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }

    .login-box {
      background: white;
      padding: 3rem 2.5rem;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 440px;
      animation: slideUp 0.5s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .login-logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .login-logo-icon {
      font-size: 4rem;
      margin-bottom: 0.5rem;
    }

    .login-title {
      text-align: center;
      font-size: 1.75rem;
      font-weight: bold;
      margin-bottom: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-input {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #f9fafb;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    .demo-credentials {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
      padding: 1.25rem;
      border-radius: 12px;
      margin-top: 1.5rem;
      border: 2px solid #c7d2fe;
    }

    .demo-credentials p {
      margin: 0.35rem 0;
      font-size: 0.875rem;
      color: #4b5563;
    }

    .demo-credentials p:first-child {
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
    }

    .demo-credentials strong {
      color: #667eea;
      font-weight: 600;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      background: white;
      margin: 2rem 0;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    /* Tabs */
    .tabs {
      background: linear-gradient(to right, #f9fafb 0%, #f3f4f6 100%);
      border-bottom: 2px solid #e5e7eb;
      padding: 0 1rem;
    }

    .tabs-container {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
    }

    .tab {
      padding: 1rem 1.5rem;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 500;
      color: #6b7280;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
      white-space: nowrap;
    }

    .tab.active {
      color: #667eea;
      border-bottom-color: #667eea;
      background: white;
    }

    .tab:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.05);
    }

    /* Content */
    .content {
      padding: 2rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .btn-group {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.75rem;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      border-color: #667eea;
    }

    .stat-info h3 {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .stat-info p {
      font-size: 2.25rem;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-icon {
      width: 4rem;
      height: 4rem;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    /* Filters */
    .filters {
      background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
      padding: 1.75rem;
      border-radius: 16px;
      margin-bottom: 1.5rem;
      border: 2px solid #e5e7eb;
    }

    .filters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.25rem;
    }

    /* Table */
    .table-container {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border: 2px solid #f3f4f6;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
    }

    th {
      padding: 1rem 1.5rem;
      text-align: left;
      font-weight: 700;
      color: white;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    td {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #f3f4f6;
    }

    tbody tr {
      transition: all 0.2s ease;
    }

    tbody tr:hover {
      background: linear-gradient(to right, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    .badge {
      padding: 0.375rem 0.875rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      display: inline-block;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .badge-success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .badge-warning {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }

    .badge-danger {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }

    /* Modal */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal {
      background: white;
      border-radius: 20px;
      padding: 2.5rem;
      width: 100%;
      max-width: 750px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.3s ease-out;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f3f4f6;
    }

    .modal-title {
      font-size: 1.75rem;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .modal-close {
      background: rgba(239, 68, 68, 0.1);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      font-size: 1.5rem;
      color: #ef4444;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-close:hover {
      background: #ef4444;
      color: white;
      transform: rotate(90deg);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 2px solid #f3f4f6;
    }

    /* Toast */
    .toast {
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: white;
      padding: 1.25rem 1.75rem;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      z-index: 2000;
      animation: slideInRight 0.3s ease-out;
      max-width: 400px;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast-success {
      border-left: 4px solid #10b981;
    }

    .toast-error {
      border-left: 4px solid #ef4444;
    }

    .toast-icon {
      font-size: 1.5rem;
    }

    .toast-message {
      flex: 1;
      font-weight: 500;
      color: #1f2937;
    }

    /* Empty State */
    .empty-state {
      background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
      padding: 5rem 2rem;
      text-align: center;
      border-radius: 20px;
      border: 2px dashed #d1d5db;
    }

    .empty-state-icon {
      font-size: 5rem;
      margin-bottom: 1.5rem;
      opacity: 0.5;
    }

    .empty-state-title {
      font-size: 1.5rem;
      color: #6b7280;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    .empty-state-text {
      color: #9ca3af;
      font-size: 1rem;
    }

    /* Progress Bar */
    .progress-container {
      margin-bottom: 1.5rem;
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .progress-label {
      font-weight: 600;
      color: #374151;
    }

    .progress-value {
      font-weight: 700;
      color: #667eea;
    }

    .progress-bar {
      width: 100%;
      height: 12px;
      background: #e5e7eb;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      transition: width 0.5s ease;
      box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
    }

    .progress-fill-success {
      background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    }

    .progress-fill-warning {
      background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
    }

    .progress-fill-danger {
      background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
    }

    /* Action Buttons */
    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    /* Chart Container */
    .chart-container {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      margin-bottom: 1.5rem;
      border: 2px solid #f3f4f6;
    }

    .chart-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    /* Summary Cards */
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.25rem;
      margin-top: 2rem;
    }

    .summary-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1.75rem;
      border-radius: 16px;
      text-align: center;
      color: white;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      transition: all 0.3s ease;
    }

    .summary-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    }

    .summary-label {
      font-size: 0.875rem;
      opacity: 0.9;
      margin-bottom: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .summary-value {
      font-size: 2.5rem;
      font-weight: 800;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .navbar-title {
        font-size: 1.25rem;
      }

      .page-title {
        font-size: 1.5rem;
      }

      .content {
        padding: 1.5rem;
      }

      .stat-card {
        padding: 1.25rem;
      }

      .stat-info p {
        font-size: 1.75rem;
      }

      .stat-icon {
        width: 3rem;
        height: 3rem;
        font-size: 1.5rem;
      }

      .modal {
        padding: 1.75rem;
      }

      .toast {
        right: 1rem;
        left: 1rem;
        max-width: calc(100% - 2rem);
      }
    }

    .hidden {
      display: none;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }

    /* Loading Spinner */
    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Scrollbar Styling */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f3f4f6;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    }

    /* Footer */
    .app-footer {
      text-align: center;
      padding: 1.5rem;
      color: white;
      font-size: 0.875rem;
      opacity: 0.8;
    }
  </style>
  <style>@view-transition { navigation: auto; }</style>
  <script src="/_sdk/data_sdk.js" type="text/javascript"></script>
  <script src="/_sdk/element_sdk.js" type="text/javascript"></script>
  <script src="https://cdn.tailwindcss.com" type="text/javascript"></script>
 </head>
 <body>
  <div id="app" class="app-container"></div>
  <script>
    // Application State
    const state = {
      isLoggedIn: false,
      currentUser: null,
      currentPage: 'dashboard',
      items: [],
      filteredItems: [],
      searchTerm: '',
      filterKondisi: 'semua',
      filterKategori: 'semua',
      showModal: false,
      editingItem: null,
      formData: {
        kodeBarang: '',
        namaBarang: '',
        tahunPerolehan: new Date().getFullYear(),
        lokasi: '',
        kategori: '',
        kondisi: 'baik',
        jumlah: 1
      },
      loginUsername: '',
      loginPassword: '',
      deleteConfirm: null,
      isLoading: false
    };

    const categories = ['Furniture', 'Elektronik', 'Alat Olahraga', 'Alat Lab', 'Buku', 'Lainnya'];
    const locations = ['Ruang Kelas', 'Lab Komputer', 'Lab IPA', 'Perpustakaan', 'Ruang Guru', 'Masjid', 'Asrama'];
    const kondisiOptions = ['baik', 'rusak ringan', 'rusak berat'];

    // Local Storage Functions
    function saveToStorage() {
      try {
        localStorage.setItem('sarpras-items', JSON.stringify(state.items));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
    }

    function loadFromStorage() {
      try {
        const stored = localStorage.getItem('sarpras-items');
        if (stored) {
          state.items = JSON.parse(stored);
          filterItems();
        }
      } catch (e) {
        console.error('Failed to load from localStorage:', e);
      }
    }

    // Filter Items
    function filterItems() {
      let filtered = state.items;

      if (state.searchTerm) {
        const term = state.searchTerm.toLowerCase();
        filtered = filtered.filter(item =>
          item.namaBarang.toLowerCase().includes(term) ||
          item.kodeBarang.toLowerCase().includes(term)
        );
      }

      if (state.filterKondisi !== 'semua') {
        filtered = filtered.filter(item => item.kondisi === state.filterKondisi);
      }

      if (state.filterKategori !== 'semua') {
        filtered = filtered.filter(item => item.kategori === state.filterKategori);
      }

      state.filteredItems = filtered;
    }

    // Authentication
    function handleLogin(e) {
      e.preventDefault();
      const { loginUsername, loginPassword } = state;
      
      if ((loginUsername === 'kepala' && loginPassword === 'kepala123') || 
          (loginUsername === 'sarpras' && loginPassword === 'sarpras123')) {
        state.isLoggedIn = true;
        state.currentUser = loginUsername === 'kepala' ? 'Kepala Sekolah' : 'Petugas Sarpras';
        state.currentPage = 'dashboard';
        showToast('Login berhasil! Selamat datang 👋', 'success');
        render();
      } else {
        showToast('Username atau password salah! ❌', 'error');
      }
    }

    function handleLogout() {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.currentPage = 'dashboard';
      state.loginUsername = '';
      state.loginPassword = '';
      showToast('Logout berhasil! Sampai jumpa 👋', 'success');
      render();
    }

    // CRUD Operations
    function handleSubmit(e) {
      e.preventDefault();
      const { formData, editingItem } = state;
      
      if (!formData.kodeBarang || !formData.namaBarang || !formData.lokasi || !formData.kategori) {
        showToast('Mohon lengkapi semua field yang wajib diisi! ⚠️', 'error');
        return;
      }

      state.isLoading = true;
      render();

      setTimeout(() => {
        if (editingItem) {
          state.items = state.items.map(item => 
            item.id === editingItem.id ? { ...formData, id: item.id } : item
          );
          showToast('Item berhasil diperbarui! ✅', 'success');
        } else {
          const newItem = {
            ...formData,
            id: Date.now().toString()
          };
          state.items.push(newItem);
          showToast('Item berhasil ditambahkan! ✅', 'success');
        }

        saveToStorage();
        filterItems();
        state.showModal = false;
        state.editingItem = null;
        state.isLoading = false;
        resetForm();
        render();
      }, 500);
    }

    function handleEdit(item) {
      state.editingItem = item;
      state.formData = { ...item };
      state.showModal = true;
      render();
    }

    function confirmDelete(item) {
      state.deleteConfirm = item;
      render();
    }

    function cancelDelete() {
      state.deleteConfirm = null;
      render();
    }

    function handleDelete() {
      if (!state.deleteConfirm) return;
      
      state.isLoading = true;
      render();

      setTimeout(() => {
        state.items = state.items.filter(item => item.id !== state.deleteConfirm.id);
        saveToStorage();
        filterItems();
        state.deleteConfirm = null;
        state.isLoading = false;
        showToast('Item berhasil dihapus! 🗑️', 'success');
        render();
      }, 300);
    }

    function resetForm() {
      state.formData = {
        kodeBarang: '',
        namaBarang: '',
        tahunPerolehan: new Date().getFullYear(),
        lokasi: '',
        kategori: '',
        kondisi: 'baik',
        jumlah: 1
      };
    }

    function openAddModal() {
      state.editingItem = null;
      resetForm();
      state.showModal = true;
      render();
    }

    function closeModal() {
      state.showModal = false;
      state.editingItem = null;
      resetForm();
      render();
    }

    // Export to CSV
    function exportToCSV() {
      const headers = ['Kode Barang', 'Nama Barang', 'Tahun Perolehan', 'Lokasi', 'Kategori', 'Kondisi', 'Jumlah'];
      const rows = state.items.map(item => [
        item.kodeBarang,
        item.namaBarang,
        item.tahunPerolehan,
        item.lokasi,
        item.kategori,
        item.kondisi,
        item.jumlah
      ]);

      let csvContent = '\uFEFF' + headers.join(',') + '\n';
      rows.forEach(row => {
        csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `inventaris_sarpras_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast('Data berhasil diexport! 📥', 'success');
    }

    // Toast Notification
    function showToast(message, type = 'info') {
      const existingToasts = document.querySelectorAll('.toast');
      existingToasts.forEach(toast => toast.remove());

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      
      const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
      
      toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
      `;
      
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease-out';
        setTimeout(() => {
          if (toast.parentNode) {
            document.body.removeChild(toast);
          }
        }, 300);
      }, 3000);
    }

    // Statistics
    function getStatistics() {
      const total = state.items.length;
      const baik = state.items.filter(item => item.kondisi === 'baik').length;
      const rusakRingan = state.items.filter(item => item.kondisi === 'rusak ringan').length;
      const rusakBerat = state.items.filter(item => item.kondisi === 'rusak berat').length;
      
      const kategoriBaik = {};
      state.items.forEach(item => {
        if (!kategoriBaik[item.kategori]) kategoriBaik[item.kategori] = 0;
        kategoriBaik[item.kategori]++;
      });

      return { total, baik, rusakRingan, rusakBerat, kategoriBaik };
    }

    // Render Functions
    function renderLoginPage() {
      return `
        <div class="login-container">
          <div class="login-box">
            <div class="login-logo">
              <div class="login-logo-icon">🏫</div>
              <h1 class="login-title">Sistem Inventaris<br>Sarana Prasarana</h1>
            </div>
            
            <form onsubmit="handleLogin(event)">
              <div class="form-group">
                <label for="username" class="form-label">👤 Username</label>
                <input 
                  type="text" 
                  id="username" 
                  class="form-input"
                  value="${state.loginUsername}"
                  oninput="state.loginUsername = this.value"
                  placeholder="Masukkan username"
                  required
                  autocomplete="username"
                />
              </div>
              
              <div class="form-group">
                <label for="password" class="form-label">🔒 Password</label>
                <input 
                  type="password" 
                  id="password" 
                  class="form-input"
                  value="${state.loginPassword}"
                  oninput="state.loginPassword = this.value"
                  placeholder="Masukkan password"
                  required
                  autocomplete="current-password"
                />
              </div>
              
              <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; font-size: 1.05rem; padding: 0.875rem;">
                🚀 Login Sekarang
              </button>
            </form>
            
            <div class="demo-credentials">
              <p>🔑 Demo Credentials</p>
              <p><strong>Kepala Sekolah:</strong> kepala / kepala123</p>
              <p><strong>Petugas Sarpras:</strong> sarpras / sarpras123</p>
            </div>
          </div>
        </div>
        <div class="app-footer">
          © 2024 Sistem Inventaris Sarana Prasarana | Dikembangkan dengan ❤️
        </div>
      `;
    }

    function renderNavbar() {
      return `
        <nav class="navbar">
          <div class="container navbar-content">
            <h1 class="navbar-title">🏫 Sistem Inventaris Sarana Prasarana</h1>
            <div class="navbar-user">
              <span class="user-badge">👤 ${state.currentUser}</span>
              <button onclick="handleLogout()" class="btn btn-logout">
                🚪 Logout
              </button>
            </div>
          </div>
        </nav>
      `;
    }

    function renderTabs() {
      const tabs = [
        { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
        { id: 'inventory', label: '📦 Data Inventaris', icon: '📦' },
        { id: 'statistics', label: '📈 Statistik', icon: '📈' }
      ];

      return `
        <div class="tabs">
          <div class="tabs-container">
            ${tabs.map(tab => `
              <button
                class="tab ${state.currentPage === tab.id ? 'active' : ''}"
                onclick="state.currentPage = '${tab.id}'; render();"
              >
                ${tab.icon} ${tab.label}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    function renderDashboard() {
      const stats = getStatistics();

      return `
        <div class="content">
          <h2 class="page-title">🎉 Selamat Datang di Sistem Inventaris</h2>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-info">
                <h3>Total Barang</h3>
                <p>${stats.total}</p>
              </div>
              <div class="stat-icon">📦</div>
            </div>

            <div class="stat-card">
              <div class="stat-info">
                <h3>Kondisi Baik</h3>
                <p>${stats.baik}</p>
              </div>
              <div class="stat-icon">✅</div>
            </div>

            <div class="stat-card">
              <div class="stat-info">
                <h3>Rusak Ringan</h3>
                <p>${stats.rusakRingan}</p>
              </div>
              <div class="stat-icon">⚠️</div>
            </div>

            <div class="stat-card">
              <div class="stat-info">
                <h3>Rusak Berat</h3>
                <p>${stats.rusakBerat}</p>
              </div>
              <div class="stat-icon">❌</div>
            </div>
          </div>

          <div class="chart-container">
            <h3 class="chart-title">📊 Distribusi per Kategori</h3>
            ${Object.keys(stats.kategoriBaik).length === 0 ? `
              <div style="text-align: center; padding: 2rem; color: #9ca3af;">
                <p style="font-size: 3rem; margin-bottom: 1rem;">📦</p>
                <p>Belum ada data kategori</p>
              </div>
            ` : `
              ${Object.entries(stats.kategoriBaik).sort((a, b) => b[1] - a[1]).map(([kategori, jumlah]) => {
                const percentage = stats.total > 0 ? (jumlah/stats.total)*100 : 0;
                return `
                  <div class="progress-container">
                    <div class="progress-header">
                      <span class="progress-label">${kategori}</span>
                      <span class="progress-value">${jumlah} item (${percentage.toFixed(1)}%)</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${percentage}%;"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            `}
          </div>
        </div>
      `;
    }

    function renderInventory() {
      return `
        <div class="content">
          <div class="page-header">
            <h2 class="page-title">📦 Data Inventaris</h2>
            <div class="btn-group">
              <button onclick="exportToCSV()" class="btn btn-success">
                📥 Export CSV
              </button>
              <button onclick="openAddModal()" class="btn btn-primary">
                ➕ Tambah Barang
              </button>
            </div>
          </div>

          <div class="filters">
            <div class="filters-grid">
              <div class="form-group">
                <label class="form-label">🔍 Cari Barang</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="Cari berdasarkan nama atau kode..."
                  value="${state.searchTerm}"
                  oninput="state.searchTerm = this.value; filterItems(); render();"
                />
              </div>

              <div class="form-group">
                <label class="form-label">🏷️ Filter Kategori</label>
                <select
                  class="form-input"
                  value="${state.filterKategori}"
                  onchange="state.filterKategori = this.value; filterItems(); render();"
                >
                  <option value="semua">Semua Kategori</option>
                  ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">⚙️ Filter Kondisi</label>
                <select
                  class="form-input"
                  value="${state.filterKondisi}"
                  onchange="state.filterKondisi = this.value; filterItems(); render();"
                >
                  <option value="semua">Semua Kondisi</option>
                  <option value="baik">Baik</option>
                  <option value="rusak ringan">Rusak Ringan</option>
                  <option value="rusak berat">Rusak Berat</option>
                </select>
              </div>
            </div>
          </div>

          ${state.filteredItems.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">📦</div>
              <div class="empty-state-title">Tidak ada data inventaris</div>
              <p class="empty-state-text">Klik tombol "Tambah Barang" untuk memulai mengelola inventaris Anda</p>
            </div>
          ` : `
            <div class="table-container">
              <div class="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Kode</th>
                      <th>Nama Barang</th>
                      <th>Tahun</th>
                      <th>Lokasi</th>
                      <th>Kategori</th>
                      <th>Kondisi</th>
                      <th>Jumlah</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${state.filteredItems.map(item => `
                      <tr>
                        <td><strong>${item.kodeBarang}</strong></td>
                        <td>${item.namaBarang}</td>
                        <td>${item.tahunPerolehan}</td>
                        <td>${item.lokasi}</td>
                        <td>${item.kategori}</td>
                        <td>
                          <span class="badge badge-${item.kondisi === 'baik' ? 'success' : item.kondisi === 'rusak ringan' ? 'warning' : 'danger'}">
                            ${item.kondisi}
                          </span>
                        </td>
                        <td><strong>${item.jumlah}</strong></td>
                        <td>
                          ${state.deleteConfirm && state.deleteConfirm.id === item.id ? `
                            <div class="action-buttons">
                              <button 
                                onclick="handleDelete()" 
                                class="btn btn-danger btn-icon" 
                                title="Konfirmasi Hapus"
                                ${state.isLoading ? 'disabled' : ''}
                              >
                                ${state.isLoading ? '<span class="spinner"></span>' : '✓'}
                              </button>
                              <button 
                                onclick="cancelDelete()" 
                                class="btn btn-secondary btn-icon" 
                                title="Batal"
                                ${state.isLoading ? 'disabled' : ''}
                              >
                                ✕
                              </button>
                            </div>
                          ` : `
                            <div class="action-buttons">
                              <button 
                                onclick='handleEdit(${JSON.stringify(item).replace(/'/g, "\\'")})'  
                                class="btn btn-primary btn-icon" 
                                title="Edit"
                              >
                                ✏️
                              </button>
                              <button 
                                onclick='confirmDelete(${JSON.stringify(item).replace(/'/g, "\\'")})'  
                                class="btn btn-danger btn-icon" 
                                title="Hapus"
                              >
                                🗑️
                              </button>
                            </div>
                          `}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `}
        </div>
      `;
    }

    function renderStatistics() {
      const stats = getStatistics();
      const total = stats.total;
      const baikPercentage = total > 0 ? ((stats.baik / total) * 100).toFixed(1) : 0;
      const rusakRinganPercentage = total > 0 ? ((stats.rusakRingan / total) * 100).toFixed(1) : 0;
      const rusakBeratPercentage = total > 0 ? ((stats.rusakBerat / total) * 100).toFixed(1) : 0;

      return `
        <div class="content">
          <h2 class="page-title">📈 Statistik Inventaris</h2>
          
          <div class="chart-container">
            <h3 class="chart-title">📊 Kondisi Barang</h3>
            <div class="progress-container">
              <div class="progress-header">
                <span class="progress-label">✅ Baik</span>
                <span class="progress-value" style="color: #10b981;">${stats.baik} item (${baikPercentage}%)</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill progress-fill-success" style="width: ${baikPercentage}%;"></div>
              </div>
            </div>

            <div class="progress-container">
              <div class="progress-header">
                <span class="progress-label">⚠️ Rusak Ringan</span>
                <span class="progress-value" style="color: #f59e0b;">${stats.rusakRingan} item (${rusakRinganPercentage}%)</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill progress-fill-warning" style="width: ${rusakRinganPercentage}%;"></div>
              </div>
            </div>

            <div class="progress-container">
              <div class="progress-header">
                <span class="progress-label">❌ Rusak Berat</span>
                <span class="progress-value" style="color: #ef4444;">${stats.rusakBerat} item (${rusakBeratPercentage}%)</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill progress-fill-danger" style="width: ${rusakBeratPercentage}%;"></div>
              </div>
            </div>
          </div>

          <div class="chart-container">
            <h3 class="chart-title">🏷️ Distribusi per Kategori</h3>
            ${Object.keys(stats.kategoriBaik).length === 0 ? `
              <div style="text-align: center; padding: 2rem; color: #9ca3af;">
                <p style="font-size: 3rem; margin-bottom: 1rem;">📦</p>
                <p>Belum ada data kategori</p>
              </div>
            ` : `
              ${Object.entries(stats.kategoriBaik).sort((a, b) => b[1] - a[1]).map(([kategori, jumlah]) => {
                const percentage = ((jumlah / total) * 100).toFixed(1);
                return `
                  <div class="progress-container">
                    <div class="progress-header">
                      <span class="progress-label">${kategori}</span>
                      <span class="progress-value">${jumlah} item (${percentage}%)</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${percentage}%;"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            `}
          </div>

          <div class="chart-container">
            <h3 class="chart-title">📋 Ringkasan Data</h3>
            <div class="summary-grid">
              <div class="summary-card">
                <div class="summary-label">Total Barang</div>
                <div class="summary-value">${total}</div>
              </div>
              <div class="summary-card" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                <div class="summary-label">Total Kategori</div>
                <div class="summary-value">${Object.keys(stats.kategoriBaik).length}</div>
              </div>
              <div class="summary-card" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
                <div class="summary-label">Persentase Baik</div>
                <div class="summary-value">${baikPercentage}%</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function renderModal() {
      if (!state.showModal) return '';
      
      return `
        <div class="modal-backdrop" onclick="if(event.target === this && !state.isLoading) closeModal()">
          <div class="modal">
            <div class="modal-header">
              <h3 class="modal-title">${state.editingItem ? '✏️ Edit Barang' : '➕ Tambah Barang Baru'}</h3>
              <button onclick="closeModal()" class="modal-close" ${state.isLoading ? 'disabled' : ''}>×</button>
            </div>

            <form onsubmit="handleSubmit(event)">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">🔢 Kode Barang <span style="color: #ef4444;">*</span></label>
                  <input
                    type="text"
                    class="form-input"
                    value="${state.formData.kodeBarang}"
                    oninput="state.formData.kodeBarang = this.value"
                    placeholder="Contoh: BRG-001"
                    required
                    ${state.isLoading ? 'disabled' : ''}
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">📦 Nama Barang <span style="color: #ef4444;">*</span></label>
                  <input
                    type="text"
                    class="form-input"
                    value="${state.formData.namaBarang}"
                    oninput="state.formData.namaBarang = this.value"
                    placeholder="Contoh: Meja Guru"
                    required
                    ${state.isLoading ? 'disabled' : ''}
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">📅 Tahun Perolehan</label>
                  <input
                    type="number"
                    class="form-input"
                    value="${state.formData.tahunPerolehan}"
                    oninput="state.formData.tahunPerolehan = parseInt(this.value)"
                    min="1900"
                    max="${new Date().getFullYear()}"
                    ${state.isLoading ? 'disabled' : ''}
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">🔢 Jumlah</label>
                  <input
                    type="number"
                    class="form-input"
                    value="${state.formData.jumlah}"
                    oninput="state.formData.jumlah = parseInt(this.value)"
                    min="1"
                    ${state.isLoading ? 'disabled' : ''}
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">📍 Lokasi <span style="color: #ef4444;">*</span></label>
                  <select
                    class="form-input"
                    value="${state.formData.lokasi}"
                    onchange="state.formData.lokasi = this.value"
                    required
                    ${state.isLoading ? 'disabled' : ''}
                  >
                    <option value="">Pilih Lokasi</option>
                    ${locations.map(loc => `<option value="${loc}" ${state.formData.lokasi === loc ? 'selected' : ''}>${loc}</option>`).join('')}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">🏷️ Kategori <span style="color: #ef4444;">*</span></label>
                  <select
                    class="form-input"
                    value="${state.formData.kategori}"
                    onchange="state.formData.kategori = this.value"
                    required
                    ${state.isLoading ? 'disabled' : ''}
                  >
                    <option value="">Pilih Kategori</option>
                    ${categories.map(cat => `<option value="${cat}" ${state.formData.kategori === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">⚙️ Kondisi</label>
                  <select
                    class="form-input"
                    value="${state.formData.kondisi}"
                    onchange="state.formData.kondisi = this.value"
                    ${state.isLoading ? 'disabled' : ''}
                  >
                    ${kondisiOptions.map(k => `<option value="${k}" ${state.formData.kondisi === k ? 'selected' : ''}>${k.charAt(0).toUpperCase() + k.slice(1)}</option>`).join('')}
                  </select>
                </div>
              </div>

              <div class="modal-footer">
                <button 
                  type="button" 
                  onclick="closeModal()" 
                  class="btn btn-secondary"
                  ${state.isLoading ? 'disabled' : ''}
                >
                  ✕ Batal
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  ${state.isLoading ? 'disabled' : ''}
                >
                  ${state.isLoading ? '<span class="spinner"></span> Menyimpan...' : (state.editingItem ? '💾 Perbarui' : '💾 Simpan')}
                </button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    function render() {
      const app = document.getElementById('app');
      
      if (!state.isLoggedIn) {
        app.innerHTML = renderLoginPage();
        return;
      }

      let content = '';
      switch (state.currentPage) {
        case 'dashboard':
          content = renderDashboard();
          break;
        case 'inventory':
          content = renderInventory();
          break;
        case 'statistics':
          content = renderStatistics();
          break;
      }

      app.innerHTML = `
        ${renderNavbar()}
        <div class="container">
          <div class="main-content">
            ${renderTabs()}
            ${content}
          </div>
        </div>
        <div class="app-footer">
          © 2024 Sistem Inventaris Sarana Prasarana | Dikembangkan dengan ❤️
        </div>
        ${renderModal()}
      `;
    }

    // Initialize App
    function init() {
      loadFromStorage();
      render();
    }

    // Start the application
    init();
  </script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9b709b17066a7e23',t:'MTc2NzI1NTcxNS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
