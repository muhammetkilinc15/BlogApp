const Category = require("../models/category");
const Blog = require("../models/blog");
const BlogCategory = require("../models/BlogCategory"); // Model ismi düzeltilmiş

async function populate() {
    const count = await Category.count();

    if(count === 0) { 
        // Kategorileri oluştur
        const categories = await Category.bulkCreate([
            { Name: "Web Geliştirme" },
            { Name: "Mobil Geliştirme" },
            { Name: "Programlama" }
        ]);

        // Blogları oluştur
        const blogs = await Blog.bulkCreate([
            {
                Title: "Komple Uygulamalı Web Geliştirme Eğitimi",
                SubTitle: "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
                Description: "Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz.",
                Image: "1.jpeg",
                mainPage: true,
                isApproved: true
            },
            {
                Title: "Python ile Sıfırdan İleri Seviye Python Programlama",
                SubTitle: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                Description: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                Image: "2.jpeg",
                mainPage: true,
                isApproved: true
            },
            {
                Title: "Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+",
                SubTitle: "Modern javascript dersleri ile (ES6 & ES7+) Nodejs, Angular, React ve VueJs için sağlam bir temel oluşturun.",
                Description: "Neden Javascript? Javascript son zamanlarda en popüler diller arasında yerini aldı hatta Javascript listenin en başında diyebiliriz. Peki son zamanlarda bu kadar popüler hale gelen Javascript nedir? Çoğu web geliştirici için Javascript sadece tarayıcıda yani client tarafında çalışan ve html içeriklerini hareketli hale getiren bir script dili olarak biliniyor.  Web sitemize eklediğimiz bir resim galerisi, bir butona tıkladığımızda bir pop-up kutusunun açılması gibi html içeriklerini hareketli hale getiren ve yıllardır kullandığımız programlama dili tabi ki Javascript. Bu yönüyle Javascript 'i yıllardır zaten kullanmaktayız. Ancak son zamanlarda Javascript' i bu kadar popüler yapan neden nedir?",
                Image: "3.jpeg",
                mainPage: true,
                isApproved: true
            },
            {
                Title: "Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                SubTitle: "Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                Description: "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin.Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur.",
                Image: "4.jpeg",
                mainPage: true,
                isApproved: true
            }
        ]);

        // // Kategorilere blog ekle
        // await categories[0].addBlogs([blogs[0], blogs[1]]);
        // await categories[1].addBlogs([blogs[2], blogs[3]]);
        // await categories[2].addBlogs([blogs[2], blogs[3]]);

        // // Blog'a kategori ekle
        // await blogs[0].addCategory(categories[1]);

        // // Yeni bir blog oluştur ve kategoriye ekle
        // await categories[0].createBlog({
        //     Title: "Yeni blog",
        //     SubTitle: "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
        //     Description: "Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz.",
        //     Image: "1.jpeg",
        //     mainPage: true,
        //     isApproved: true
        // });
    }
}

module.exports = populate;
