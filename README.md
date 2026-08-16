# Oyuncak Toplama

Sürüm **0.28** — 5 yaşındaki çocuklarla birlikte oynanan iki oyunculu web oyunu. Karakterler kodlama bloklarıyla hareket eder; dağınık odadaki oyuncakları kim daha çok toplarsa o kazanır. Tablet ve bilgisayar tarayıcısında çalışır.

## Nasıl oynanır?

1. **İsim ve şifre** ile gir (veya **Gmail ile bağlan**). Yoksa **Kayıt ol**.
2. **İki kişi** veya **Bota karşı** seç (bot zorluğu: kolay, orta, zor — varsayılan orta).
3. **1. oyuncu** ve **2. oyuncu** için birer karakter ve **sepet** seç (Elif, Can, Lila, Karamel, Ece, Deniz, Pamuk, Nane). Karakterin altındaki isme dokunup adı değiştirebilirsin. Bota karşı oynarken yalnızca kendi karakterini seçersin.
4. Dağınık bir **oda** seç.
5. Kendi sıranda oklarla **tam 6 yön** yaz. 6 olmadan karakter ilerlemez.
6. **Çalıştır** ile o 6 adımı yapsın. Sonra sıra diğer oyuncuya (veya bota) geçer.
7. Bütün oyuncaklar bitince **en çok toplayan kazanır**. Eşitse berabere.

Sıra sıra oynanır: önce 1. oyuncu 6 yön yazıp çalıştırır, sonra 2. oyuncu (veya bot).

- Tablet: sol panel 1. oyuncu, sağ panel 2. oyuncu. Yönleri oka dokunarak veya kaydırarak yaz.
- Bilgisayar: sıra kimdeyse yön tuşları + `Enter`.

## Sürüm

Şu an: **0.28**

Sürümler `0.1`, `0.2`, … `0.99` gider; sonra `1.0`, ardından `1.1` diye devam eder.

## Oyunu açmak

Hemen oyna: [https://salimoglu.github.io/oyuncak-toplama/](https://salimoglu.github.io/oyuncak-toplama/)

- Bilgisayarda `index.html` dosyasını tarayıcıda açın.
- Tablette aynı adresi tarayıcıdan açın; ana ekrana eklerseniz uygulama gibi açılır. Sayfayı yenileyince oyun yeni sürüme geçer.
- Ana menüdeki **Ebeveyn** ile 15 / 30 / 45 / 60 dakikalık günlük süre konur. Süre bitince oyun kilitlenir, ertesi gün sıfırlanır. Ayarlar hesaba bağlıdır.
- **Gmail** için Firebase projesi gerekir: Authentication’da E-posta ve Google’ı aç, `firebase-config.js` içine proje anahtarlarını yaz, Authorized domains’e `salimoglu.github.io` ekle.

## Geliştirme

Bu bir statik sitedir: HTML, CSS ve JavaScript. Kurulum veya derleme gerekmez.
