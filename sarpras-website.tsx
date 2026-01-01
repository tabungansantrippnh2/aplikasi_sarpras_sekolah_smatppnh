import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, LogOut, Download, Filter, BarChart3, Package } from 'lucide-react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKondisi, setFilterKondisi] = useState('semua');
  const [filterKategori, setFilterKategori] = useState('semua');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    kodeBarang: '',
    namaBarang: '',
    tahunPerolehan: new Date().getFullYear(),
    lokasi: '',
    kategori: '',
    kondisi: 'baik',
    jumlah: 1
  });

  const categories = ['Furniture', 'Elektronik', 'Alat Olahraga', 'Alat Lab', 'Buku', 'Lainnya'];
  const locations = ['Ruang Kelas', 'Lab Komputer', 'Lab IPA', 'Perpustakaan', 'Ruang Guru', 'Masjid', 'Asrama'];
  const kondisiOptions = ['baik', 'rusak ringan', 'rusak berat'];

  // Load data from storage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await window.storage.get('sarpras-items');
        if (result && result.value) {
          const loadedItems = JSON.parse(result.value);
          setItems(loadedItems);
          setFilteredItems(loadedItems);
        }
      } catch (error) {
        console.log('No data found, starting fresh');
      }
    };
    loadData();
  }, []);

  // Save data whenever items change
  useEffect(() => {
    const saveData = async () => {
      if (items.length > 0) {
        try {
          await window.storage.set('sarpras-items', JSON.stringify(items));
        } catch (error) {
          console.error('Error saving data:', error);
        }
      }
    };
    saveData();
  }, [items]);

  // Filter and search
  useEffect(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.namaBarang.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kodeBarang.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterKondisi !== 'semua') {
      filtered = filtered.filter(item => item.kondisi === filterKondisi);
    }

    if (filterKategori !== 'semua') {
      filtered = filtered.filter(item => item.kategori === filterKategori);
    }

    setFilteredItems(filtered);
  }, [searchTerm, filterKondisi, filterKategori, items]);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = () => {
    // Simple authentication (in production, use proper backend)
    if ((loginUsername === 'kepala' && loginPassword === 'kepala123') || 
        (loginUsername === 'sarpras' && loginPassword === 'sarpras123')) {
      setIsLoggedIn(true);
      setCurrentUser(loginUsername === 'kepala' ? 'Kepala Sekolah' : 'Petugas Sarpras');
    } else {
      alert('Username atau password salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  const handleSubmit = () => {
    if (!formData.kodeBarang || !formData.namaBarang || !formData.lokasi || !formData.kategori) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
      return;
    }
    
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id ? { ...formData, id: item.id } : item
      ));
    } else {
      const newItem = {
        ...formData,
        id: Date.now().toString()
      };
      setItems([...items, newItem]);
    }

    setShowModal(false);
    setEditingItem(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      kodeBarang: '',
      namaBarang: '',
      tahunPerolehan: new Date().getFullYear(),
      lokasi: '',
      kategori: '',
      kondisi: 'baik',
      jumlah: 1
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const exportToCSV = () => {
    const headers = ['Kode Barang', 'Nama Barang', 'Tahun Perolehan', 'Lokasi', 'Kategori', 'Kondisi', 'Jumlah'];
    const csvData = [
      headers.join(','),
      ...filteredItems.map(item => 
        [item.kodeBarang, item.namaBarang, item.tahunPerolehan, item.lokasi, item.kategori, item.kondisi, item.jumlah].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-sarpras-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStats = () => {
    return {
      total: items.length,
      baik: items.filter(i => i.kondisi === 'baik').length,
      rusakRingan: items.filter(i => i.kondisi === 'rusak ringan').length,
      rusakBerat: items.filter(i => i.kondisi === 'rusak berat').length
    };
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">SMA Terpadu</h1>
            <h2 className="text-xl font-semibold text-green-700">Pondok Pesantren Nurul Huda</h2>
            <p className="text-gray-600 mt-2">Sistem Manajemen Sarana Prasarana</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="kepala / sarpras"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="********"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Login
            </button>
          </div>
          
          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>Demo Login:</p>
            <p>Kepala Sekolah: kepala / kepala123</p>
            <p>Petugas Sarpras: sarpras / sarpras123</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">SMA Terpadu PP Nurul Huda</h1>
              <p className="text-green-100 text-sm">Sistem Manajemen Sarana Prasarana</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Halo, {currentUser}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`px-4 py-3 font-medium transition-colors ${
                currentPage === 'dashboard' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              <BarChart3 className="inline mr-2" size={18} />
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('data')}
              className={`px-4 py-3 font-medium transition-colors ${
                currentPage === 'data' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              <Package className="inline mr-2" size={18} />
              Data Barang
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Barang</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Package className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Kondisi Baik</p>
                    <p className="text-3xl font-bold text-green-600">{stats.baik}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Rusak Ringan</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.rusakRingan}</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <div className="w-6 h-6 bg-yellow-600 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Rusak Berat</p>
                    <p className="text-3xl font-bold text-red-600">{stats.rusakBerat}</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Items */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Terbaru</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kode</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama Barang</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lokasi</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kondisi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.slice(-5).reverse().map(item => (
                      <tr key={item.id} className="border-t">
                        <td className="px-4 py-3 text-sm">{item.kodeBarang}</td>
                        <td className="px-4 py-3 text-sm">{item.namaBarang}</td>
                        <td className="px-4 py-3 text-sm">{item.lokasi}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.kondisi === 'baik' ? 'bg-green-100 text-green-700' :
                            item.kondisi === 'rusak ringan' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {item.kondisi}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'data' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Data Barang</h2>
              <div className="flex gap-3">
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download size={18} />
                  Export CSV
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    setEditingItem(null);
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={18} />
                  Tambah Barang
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Cari barang..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={filterKondisi}
                    onChange={(e) => setFilterKondisi(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                  >
                    <option value="semua">Semua Kondisi</option>
                    {kondisiOptions.map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={filterKategori}
                    onChange={(e) => setFilterKategori(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                  >
                    <option value="semua">Semua Kategori</option>
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Kode</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Nama Barang</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Tahun</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Lokasi</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Kategori</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Kondisi</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Jumlah</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                          Tidak ada data barang
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map(item => (
                        <tr key={item.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">{item.kodeBarang}</td>
                          <td className="px-4 py-3 text-sm font-medium">{item.namaBarang}</td>
                          <td className="px-4 py-3 text-sm">{item.tahunPerolehan}</td>
                          <td className="px-4 py-3 text-sm">{item.lokasi}</td>
                          <td className="px-4 py-3 text-sm">{item.kategori}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.kondisi === 'baik' ? 'bg-green-100 text-green-700' :
                              item.kondisi === 'rusak ringan' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {item.kondisi}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{item.jumlah}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(item)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingItem ? 'Edit Barang' : 'Tambah Barang Baru'}
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kode Barang*</label>
                    <input
                      type="text"
                      value={formData.kodeBarang}
                      onChange={(e) => setFormData({...formData, kodeBarang: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Barang*</label>
                    <input
                      type="text"
                      value={formData.namaBarang}
                      onChange={(e) => setFormData({...formData, namaBarang: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tahun Perolehan*</label>
                    <input
                      type="number"
                      value={formData.tahunPerolehan}
                      onChange={(e) => setFormData({...formData, tahunPerolehan: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi*</label>
                    <select
                      value={formData.lokasi}
                      onChange={(e) => setFormData({...formData, lokasi: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Pilih Lokasi</option>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori*</label>
                    <select
                      value={formData.kategori}
                      onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kondisi*</label>
                    <select
                      value={formData.kondisi}
                      onChange={(e) => setFormData({...formData, kondisi: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {kondisiOptions.map(k => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah*</label>
                    <input
                      type="number"
                      value={formData.jumlah}
                      onChange={(e) => setFormData({...formData, jumlah: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    {editingItem ? 'Update' : 'Simpan'}
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingItem(null);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;