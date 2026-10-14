// Автоматическая подстановка текущего года в футер
document.querySelectorAll('[data-year]').forEach(function(el){
  el.textContent = new Date().getFullYear();
});

// Netlify Identity: редирект в админку после входа
if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', function(user){
    if (!user) {
      window.netlifyIdentity.on('login', function(){
        document.location.href = '/admin/';
      });
    }
  });
}