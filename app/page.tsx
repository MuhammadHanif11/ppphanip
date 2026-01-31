"use client";

import type React from "react";

import { useState } from "react";
import {
  ChevronDown,
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  Award,
  CheckCircle,
  UserCheck,
  BookText,
  Users,
  Upload
} from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
  nama_lengkap: "",
  email: "",
  NIM: "",
  whatsapp: "",
  paymentProof: null as File | null,
  });

  const [toast, setToast] = useState<string | null>(null);

  const openWhatsAppAndCopy = (phone: string, label: string) => {
    // Copy ke clipboard
    navigator.clipboard.writeText(phone);

    // Buka WhatsApp chat
    const formattedPhone = phone.replace(/\D/g, "");
    window.open(`https://wa.me/${formattedPhone}`, "_blank");

    // Tampilkan toast
    setToast(`${label} berhasil disalin`);
    setTimeout(() => setToast(null), 2500);
  };

  const copyOnly = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToast(`${label} berhasil disalin`);
    setTimeout(() => setToast(null), 2500);
  };


  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validasi ukuran max 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file maksimal 10MB");
      e.target.value = "";
      return;
    }

    setFileName(file.name);
    setFormData({
      ...formData,
      paymentProof: file,
    });
  };

  

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.paymentProof) {
      alert("Bukti pembayaran wajib diupload");
      return;
    }
  
    const payload = new FormData();
    payload.append("nama_lengkap", formData.nama_lengkap);
    payload.append("email", formData.email);
    payload.append("NIM", formData.NIM);
    payload.append("whatsapp", formData.whatsapp);
    payload.append("paymentProof", formData.paymentProof);
  
    try {
      const response = await fetch(
        "https://n8n-udwcj72ykzgp.cica.sumopod.my.id/webhook/ba115d69-eed9-4d4e-9fd9-be86f886811c",
        {
          method: "POST",
          body: payload,
        }
      );
    
      if (!response.ok) {
        throw new Error("Request ke webhook gagal");
      }
    
      setSubmitted(true);
    
      setFormData({
        nama_lengkap: "",
        email: "",
        NIM: "",
        whatsapp: "",
        paymentProof: null,
      });
    
      setFileName("");
    
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengirim data");
    }
  };



  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">
           Teknik Informatika 2025
          </h1>
          <div className="hidden md:flex gap-8">
            <a
              href="#tentang"
              className="text-sm hover:text-primary transition"
            >
              Tentang
            </a>
            <a href="#jadwal" className="text-sm hover:text-primary transition">
              Jadwal
            </a>
            <a href="#faq" className="text-sm hover:text-primary transition">
              FAQ
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">
              Belajar Bareng Teknik Informatika 2025
            </h1>
            <p className="text-xl text-muted-foreground text-balance">
              Tempat santai buat saling belajar coding, diskusi, dan sharing pengalaman sebelum dan selama kuliah
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>setiap hari sabtu</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>09:30 - 11:00 WIB</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>ITC lantai 2</span>
              </div>
            </div>
            <a
              href="#pendaftaran"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition w-fit"
            >
              Daftar Sekarang
            </a>
          </div>
          <div className="hidden lg:block">
            <img
              src="/hanip.jpeg"
              alt="Tech Summit"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Tentang kegiatan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Apa Itu Belajar Bareng?</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Belajar Bareng adalah kegiatan kumpul santai untuk mahasiswa Teknik Informatika UIN Maulana Malik Ibrahim Malang angkatan 2025 yang ingin sama-sama belajar coding dari dasar. Kegiatan dibuat ringan, tidak kaku, dan fokus pada saling membantu memahami materi perkuliahan.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Tujuan & Manfaat
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Membantu teman-teman memahami dasar pemrograman, melatih logika, dan membiasakan praktik bareng tanpa tekanan. Tidak ada target nilai atau ujian, yang penting paham dan bisa berkembang bareng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Keuntungan Mengikuti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "Grup Diskusi Aktif",
                desc: "Tempat ngobrol, tanya jawab, dan diskusi bebas tanpa takut salah.",
              },
              {
                icon: BookText,
                title: "E-Modul Pembelajaran",
                desc: "E-Modul sederhana yang gampang dipahami dan langsung dipraktikkan.",
              },
              {
                icon: Users,
                title: "Relasi & Networking",
                desc: "Membangun jaringan pertemanan dengan sesama mahasiswa Teknik Informatika terutama angkatan 2025.",
              },
              {
                icon: UserCheck,
                title: "Pendampingan Praktik",
                desc: "Bimbingan langsung dari pendamping dan teman teman yang sudah menguasai materi.",
              },
              {
                icon: Award,
                title: "Pemahaman Materi",
                desc: "Memahami materi dengan mudah karena model pembelajaran yang terstruktur.",
              },
              {
                icon: CheckCircle,
                title: "Pengalaman Belajar Bareng",
                desc: "Kegiatan ini dilakukan secara bersama sama disatu tempat yang sama",
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-card p-6 rounded-lg border border-border hover:border-primary transition"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section id="jadwal" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Alur Kegiatan</h2>
          <div className="space-y-4">
            {[
              {
                time: "09:30 - 10:00",
                activity: "Ngobrol & bahas materi yang sudah dibagikan.",
                speaker: "pendamping",
              },
              {
                time: "10:00 - 10:30",
                activity: "Praktik bareng dan saling bantu",
                speaker: "pendamping & peserta",
              },
              {
                time: "10:30 - 11:00",
                activity: "Tanya jawab santai & sharing pengalaman",
                speaker: "semua yang hadir",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-6 pb-6 border-b border-border last:border-b-0"
              >
                <div className="text-primary font-mono text-sm w-28 flex-shrink-0">
                  {item.time}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{item.activity}</h4>
                  {item.speaker && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.speaker}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Siapa yang Cocok untuk Ikut?
          </h2>
          <div className="bg-card p-12 rounded-lg border border-border">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Kegiatan ini cocok buat{" "}
              <span className="text-foreground font-semibold">
                mahasiswa Teknik Informatika
              </span>{" "}
              yang ingin belajar coding bareng secara santai, suka diskusi, dan ingin pelan-pelan memahami materi tanpa suasana kelas yang kaku.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Section */}
     <section id="pendaftaran" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Ikut Gabung Belajar Bareng
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Isi data di bawah supaya bisa gabung di kegiatan ini
        </p>

        {submitted && (
          <div className="mb-6 bg-primary/20 border border-primary p-4 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>
              Terima kasih! Kamu sudah terdaftar. Informasi selanjutnya akan kami kirim lewat email atau WhatsApp.
            </span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          noValidate
        >
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama_lengkap"
              placeholder="Masukkan nama lengkap Anda"
              value={formData.nama_lengkap}
              onChange={(e) =>
                setFormData({ ...formData, nama_lengkap: e.target.value })
              }
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              required
            />
          </div>
            
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Aktif
            </label>
            <input
              type="email"
              name="email"
              placeholder="contoh@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              required
            />
          </div>
            
          {/* NIM */}
          <div>
            <label className="block text-sm font-medium mb-2">
              NIM
            </label>
            <input
              type="text"
              name="NIM"
              placeholder="Contoh: 25xxxxxxxxxx"
              value={formData.NIM}
              onChange={(e) =>
                setFormData({ ...formData, NIM: e.target.value })
              }
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              required
            />
          </div>
            
          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Nomor WhatsApp
            </label>
            <input
              type="tel"
              name="whatsapp"
              placeholder="08xxxxxxxxxx"
              value={formData.whatsapp}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp: e.target.value })
              }
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              required
            />
          </div>
            
          {/* Bukti Pembayaran */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Bukti Pembayaran (Max 10MB)
            </label>

            <div className="relative">
              <input
                id="payment"
                type="file"
                name="paymentProof"
                accept="image/jpeg,image/jpg"
                onChange={handleFileChange}
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-lg bg-background hover:border-primary/50 transition-colors">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {fileName || "Pilih file atau drag & drop di sini"}
                </span>
              </div>
            </div>
          </div>

                
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Kirim Pendaftaran
          </button>
        </form>
      </div>
    </section>


      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Pertanyaan Umum
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Apakah terdapat biaya ketika mengikuti kegiatan ini?",
                a: "Iya ada, namun sangat terjangkau bagi mahasiswa.",
              },
              {
                q: "Berapa biaya yang harus dibayar?",
                a: "Hanya Rp10.000 per bulan yang bisa dibayar via e-wallet.",
              },
              {
                q: "Apakah saya akan mendapatkan sertifikat?",
                a: "Tidak, karena kegiatan ini bersifat non formal tetapi kami pastikan anda dapat memahami materi dengan baik.",
              },
              {
                q: "Bagaimana saya akan membayar uang bulanan?",
                a: "Anda bisa klik nomer dana yang sudah kami siapkan di bawah.",
              },
              {
                q: "Apa saja yang harus saya persiapkan sebelum mengikuti kegiatan?",
                a: "Pastinya niat yang kuat untuk belajar dan siapkan juga laptop supaya dapat memudahkan dalam praktik.",
              },
              {
                q: "Bagaimana saya tahu kalau saya sudah terdaftar di kegiatan ini?",
                a: "Setelah anda mendaftar dengan benar kami akan mengirimkan pesan via whatsapp atau email",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === idx ? null : idx)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition"
                >
                  <span className="font-semibold text-left">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-secondary/30 border-t border-border text-muted-foreground">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

            {/* Brand */}
            <div>
              <h3 className="font-bold text-lg mb-4">
                Belajar Bareng Teknik Informatika 2025
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kegiatan belajar coding santai dan kolaboratif untuk mahasiswa
                Teknik Informatika UIN Maulana Malik Ibrahim Malang angkatan 2025.
              </p>
            </div>

            {/* Kontak */}
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  WhatsApp Mas Alfath:
                  <button
                    onClick={() =>
                      openWhatsAppAndCopy(
                        "+6282117198077",
                        "Nomor WhatsApp Mas Alfath"
                      )
                    }
                    className="ml-2 hover:text-primary transition font-medium"
                  >
                    +62 821-1719-8077
                  </button>
                </li>
                  
                <li>
                  WhatsApp Mbak Syakira:
                  <button
                    onClick={() =>
                      openWhatsAppAndCopy(
                        "+6285648764905",
                        "Nomor WhatsApp Mbak Syakira"
                      )
                    }
                    className="ml-2 hover:text-primary transition font-medium"
                  >
                    +62 856-4876-4905
                  </button>
                </li>
              </ul>
            </div>
                  
            {/* Informasi Pembayaran */}
            <div>
              <h4 className="font-semibold mb-4">Informasi Pembayaran</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  Dana Mas Hanif:
                  <button
                    onClick={() =>
                      copyOnly(
                        "081335754282",
                        "Nomor Dana Mas Hanif"
                      )
                    }
                    className="ml-2 hover:text-primary transition font-medium"
                  >
                    0813-3575-4282
                  </button>
                </li>
                  
                <li>
                  Dana Mbak Zada:
                  <button
                    onClick={() =>
                      copyOnly(
                        "082164571130",
                        "Nomor Dana Mbak Zada"
                      )
                    }
                    className="ml-2 hover:text-primary transition font-medium"
                  >
                    0821-6457-1130
                  </button>
                </li>
              </ul>
            </div>
          </div>
                  
          {/* Copyright */}
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              © 2026 Belajar Bareng Teknik Informatika 2025. Seluruh hak cipta
              dilindungi.
            </p>
          </div>
        </div>
                  
        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-primary text-primary-foreground px-5 py-3 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
            {toast}
          </div>
        )}
      </footer>



    </div>
  );
}
