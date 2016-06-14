var e = document.getElementById('rules');
e.onmouseover = function() {
  document.getElementById('rulesformat').style.display = 'block';
  console.log("hello");
}
e.onmouseout = function() {
  document.getElementById('rulesformat').style.display = 'none';
}