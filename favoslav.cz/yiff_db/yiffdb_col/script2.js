function imgs(id) {

  //Image
  var element = document.getElementById(id);
  element.classList.toggle("active");
  console.log('Debug --', element)

  //Body
  var element2 = document.getElementById('body');
  element2.classList.toggle("imgactive");
  console.log('Debug --', element2)
}