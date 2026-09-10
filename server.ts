import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

interface Pegawai {
  id: string;
  nip: string;
  nama: string;
  email: string;
  jabatan: string;
  divisi: string;
  noHp: string;
  statusLogin: 'Aktif' | 'Nonaktif';
  terakhirLogin?: string;
  credentialCleared?: boolean;
}

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  targetPegawai: string;
  targetEmail: string;
  detail: string;
}

// In-Memory Database Store (can sync with persistent store)
let pegawaiDatabase: Pegawai[] = [
  {
    id: "peg-001",
    nip: "3102931",
    nama: "Ahmad Syahputra",
    email: "ahmad.syahputra@sucofindo.co.id",
    jabatan: "Inspektur NDT Utama",
    divisi: "Inspeksi Teknis & NDT",
    noHp: "081266123412",
    statusLogin: "Aktif",
    terakhirLogin: "2026-07-28 08:30 WIB"
  },
  {
    id: "peg-002",
    nip: "3102932",
    nama: "Dewi Lestari",
    email: "dewi.lestari@sucofindo.co.id",
    jabatan: "Auditor Sistem Manajemen",
    divisi: "Sertifikasi Industri",
    noHp: "081377881290",
    statusLogin: "Aktif",
    terakhirLogin: "2026-07-27 16:15 WIB"
  },
  {
    id: "peg-003",
    nip: "3102933",
    nama: "Rahmat Hidayat",
    email: "rahmat.hidayat@sucofindo.co.id",
    jabatan: "Analis Laboratorium Lingkungan",
    divisi: "Pengujian & Lingkungan",
    noHp: "085290112233",
    statusLogin: "Aktif",
    terakhirLogin: "2026-07-28 07:45 WIB"
  },
  {
    id: "peg-004",
    nip: "3102934",
    nama: "Siti Rahmah",
    email: "siti.rahmah@sucofindo.co.id",
    jabatan: "Spesialis EBTKE Geothermal",
    divisi: "Energi & Geothermal",
    noHp: "081299887766",
    statusLogin: "Nonaktif",
    terakhirLogin: "2026-07-20 10:00 WIB"
  },
  {
    id: "peg-005",
    nip: "3102935",
    nama: "Budi Perkasa",
    email: "budi.perkasa@sucofindo.co.id",
    jabatan: "Field Engineer Area Migas",
    divisi: "Inspeksi Migas Duri",
    noHp: "081385066178",
    statusLogin: "Aktif",
    terakhirLogin: "2026-07-28 09:12 WIB"
  }
];

let auditLogsDatabase: AuditLog[] = [
  {
    id: "audit-001",
    timestamp: "2026-07-28 08:00 WIB",
    action: "SYSTEM_INIT",
    targetPegawai: "System",
    targetEmail: "system@sucofindo.co.id",
    detail: "Inisialisasi Database Pegawai PT Sucofindo Unit Pelayanan Duri"
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Get all pegawai
  app.get("/api/pegawai", (req, res) => {
    res.json({
      success: true,
      data: pegawaiDatabase,
      total: pegawaiDatabase.length
    });
  });

  // API Route: Add new pegawai
  app.post("/api/pegawai", (req, res) => {
    const { nip, nama, email, jabatan, divisi, noHp } = req.body;

    if (!nama || !email || !nip) {
      return res.status(400).json({
        success: false,
        message: "NIP, Nama, dan Email pegawai wajib diisi."
      });
    }

    const newPegawai: Pegawai = {
      id: `peg-${Date.now()}`,
      nip: String(nip),
      nama: String(nama),
      email: String(email),
      jabatan: jabatan || "Staff Unit Duri",
      divisi: divisi || "Operasional Duri",
      noHp: noHp || "-",
      statusLogin: "Aktif",
      terakhirLogin: "Baru terdaftar"
    };

    pegawaiDatabase.unshift(newPegawai);

    // Audit log
    auditLogsDatabase.unshift({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }) + " WIB",
      action: "ADD_PEGAWAI",
      targetPegawai: newPegawai.nama,
      targetEmail: newPegawai.email,
      detail: `Pendaftaran pegawai baru NIP ${newPegawai.nip} (${newPegawai.jabatan})`
    });

    return res.status(201).json({
      success: true,
      message: `Data pegawai "${newPegawai.nama}" berhasil ditambahkan.`,
      data: newPegawai
    });
  });

  // API Route: Delete pegawai with URI decode & fallback matching (ID or Email)
  app.delete("/api/pegawai/:id", (req, res) => {
    try {
      const rawParam = req.params.id;
      // Handle URI decoding
      const decodedParam = decodeURIComponent(rawParam).trim();

      // Fallback matching: Find by ID, exact decoded ID, or Email (case-insensitive)
      const index = pegawaiDatabase.findIndex((p) => {
        const matchId = p.id === decodedParam || p.id === rawParam;
        const matchEmail = p.email.toLowerCase() === decodedParam.toLowerCase();
        const matchNip = p.nip === decodedParam;
        return matchId || matchEmail || matchNip;
      });

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: `Data pegawai dengan identifikasi "${decodedParam}" tidak ditemukan di database Unit Duri.`
        });
      }

      const targetPegawai = pegawaiDatabase[index];

      // 1. Pembersihan kredensial login terasosiasi
      targetPegawai.statusLogin = 'Nonaktif';
      targetPegawai.credentialCleared = true;

      // 2. Remove employee from active database list
      pegawaiDatabase.splice(index, 1);

      // 3. Pencatatan log audit secara otomatis
      const auditEntry: AuditLog = {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }) + " WIB",
        action: "DELETE_PEGAWAI",
        targetPegawai: targetPegawai.nama,
        targetEmail: targetPegawai.email,
        detail: `Penghapusan data pegawai (NIP: ${targetPegawai.nip}). Kredensial login terasosiasi dibersihkan.`
      };
      auditLogsDatabase.unshift(auditEntry);

      // Return success response
      return res.json({
        success: true,
        message: `✅ Data pegawai "${targetPegawai.nama}" berhasil dihapus.`,
        deletedPegawai: targetPegawai,
        auditLog: auditEntry
      });
    } catch (err: any) {
      console.error("Error in DELETE /api/pegawai/:id:", err);
      return res.status(500).json({
        success: false,
        message: `Terjadi kesalahan server saat menghapus pegawai: ${err?.message || "Unknown error"}`
      });
    }
  });

  // API Route: Get Audit Logs
  app.get("/api/audit-logs", (req, res) => {
    res.json({
      success: true,
      data: auditLogsDatabase
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
