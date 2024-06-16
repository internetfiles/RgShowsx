self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('rgshows-cache-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/logo,png',
          'issues.html',
          '/guide.html',
          '/dmca.html',
          '/banned.html',
          '/announcements.html',
          '/404.html',
          '/.htaccess',
          '/banner.png',
          '/favicon.ico',
          '/404.html',
          '/torrent/header.png',
          '/torrent/index.html',
          '/torrent/scripts.js',
          '/torrent/styles.css',
          '/pages/page1.html',
          '/pages/page2.html',
          '/pages/page3.html',
          '/pages/page4.html',
          '/pages/page5.html',
          '/pages/page6.html',
          '/pages/page7.html',
          '/livetv/index.html',
          '/livetv/header.png',
          '/livetv/playlist.m3u',
          '/livetv/default_logo.png',
          '/livetv/creator_choice/index.html',
          '/livetv/creator_choice/T20.png',
          '/js/adblock.js',
          '/js/banned_user.js',
          '/js/blocker.js',
          '/js/blockIP.js',
          '/js/devtoolsdetector.js',
          '/js/jquery.js',
          '/js/logger.js',
          '/js/nocheats.js',
          '/js/openload.user.js',
          '/js/popup.js',
          '/js/popupblocker.js',
          '/js/restrictedshortcut.js',
          '/js/screenfull.js',
          '/js/shortcut.js',
          '/js/site.js',
          '/js/smoothscroll.js',
          '/js/statistics.js',
          '/css/flash.css',
          '/anime/anime.html',
          '/anime/embed.html',
          '/anime/episode.html',
          '/anime/index.html',
          '/anime/search.html',
          '/anime/css/anime.css',
          '/anime/css/episode.css',
          '/anime/css/index.css',
          '/anime/css/search.css',
          '/anime/js/anime.js',
          '/anime/js/episode.js',
          '/anime/js/index.js',
          '/anime/js/search.js',
          '/anime/static/header.png',
          '/anime/static/loading1.png',
          '/anime/static/loading2.png',
          '/icons/icon-192x192.png',
          '/icons/icon-512x512.png',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  