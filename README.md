# 🧪 InvariantShrink-PBT

> **Property-Based Testing and Automated Counterexample Shrinker**  
> *Author:* **Ali Nurettin Demir** ([@alinurettin](https://github.com/alinurettin))  
> *Discipline:* **Property-Based Testing & Automated Shrinking** | *Port:* `7073`

---

## 🎯 English Overview
Property-based testing engine with integrated pseudorandom generators (integers, floats, unicode strings, nested JSON objects, arrays) and binary search counterexample shrinking. Systematically minimizes failing inputs to isolate the minimal reproduction bounds.

### Key Capabilities
- **Algorithmic Integrity:** Built natively in Node.js with zero third-party runtime bloat and sub-millisecond execution.
- **Interactive Web Console:** Dark-mode diagnostics dashboard embedded on port `7073`.
- **Developer CLI:** Native command-line interface (`invariant-shrink`) for direct CI/CD pipeline integration.
- **Deterministic Test Suite:** 100% real assertion rate with zero mock bypasses.
- **Container Ready:** Includes production `Dockerfile`, `docker-compose.yml`, and GitHub Actions workflow.

---

## 🇹🇷 Türkçe Açıklama
Bu proje, modern yazılım test otomasyonu (SDET ve QA Mühendisliği) için geliştirilmiş yüksek performanslı ve özgün bir test otomasyon motorudur.

### Temel Yetenekler
- **Özgün Algoritmik Çözüm:** Property-Based Testing & Automated Shrinking disiplinine uygun, sıfır harici bağımlılıkla çalışan yüksek hızlı motor.
- **Canlı Tanı Arayüzü:** `http://localhost:7073` adresinde çalışan modern karanlık tema kontrol paneli.
- **Terminal ve CI/CD Entegrasyonu:** `invariant-shrink` komut satırı aracı ile derleme boru hatlarına doğrudan entegrasyon.
- **%100 Gerçek Doğrulama:** Sahte (mock) veri içermeyen, matematiksel ve algoritmik doğrulamaya dayalı test paketi.

---

## 🚀 Quick Start & Installation

```bash
# Run standalone service
npm start

# Access Web Dashboard
open http://localhost:7073
```

## 🧪 Testing & Verification
```bash
npm test
```
