let modalBtn = document.getElementById('modal-btn');
let modal = document.querySelector(".modal");
let cancelBtn = document.querySelector(".cancel-btn");
let saveBtn = document.getElementById('save-btn');
let Priority = document.querySelector('.Priority');


// create main block

const blockStyle = {
  display: 'none',
  border: '2px solid black',
  width: '200px',
  height: '163px',
  margin: '40px 0px 0px 40px',
};

const selectorStyles = {
  display: 'block',
  margin: '-27px 0px 0px 160px',
  border: '2px solid black',
  width: '32px',
  height: '30px',
  borderRadius: '10px',
  outline: 'none',
  webkitAppearance: 'none',
  textAlignLast: 'center',
  background: 'none',
};

function createRow(styles) {
  const row = document.createElement("li");
  Object.assign(row.style, styles);
  return row;
}

function createSelector() {
  const arrselect = ["...", "done", "edit", "delete"];
  const selector = document.createElement("select");

  selector.id = 'change'

  for (let i = 0; i < arrselect.length; i++) {
    let option = document.createElement("option");
    option.value = arrselect[i];
    option.text = arrselect[i];
    selector.appendChild(option);
  }

  Object.assign(selector.style, selectorStyles);

  return selector;
}

function createBlock(id) {
  const block = document.createElement('div');
  block.id = id;

//////change background color block

  var colors = ['white', 'lightgrey'];
  i = 0;
  block.addEventListener('click', function(e) {
    block.style.background = colors[++i % colors.length];
  });


  Object.assign(block.style, blockStyle);

  const row1 = createRow({
    display: 'block',
    margin: '10px 0px 0px 8px',
    width: '180px',
    height: '20px',
    listStyleType: 'none',
    textAlign: 'left',
    fontWeight: 'bold',
  });

  const row2 = createRow({
    display: 'block',
    margin: '35px 0px 0px 8px',
    width: '180px',
    height: '20px',
    listStyleType: 'none',
    textAlign: 'left',
    fontWeight: 'bold',
  });

  const row3 = createRow({
    display: 'block',
    margin: '38px 0px 0px 10px',
    width: '48px',
    height: '23px',
    border: '2px dashed black',
    borderRadius: '7px',
    listStyleType: 'none',
  });

  const selector = createSelector();

  block.appendChild(row1);
  block.appendChild(row2);
  block.appendChild(row3);
  block.appendChild(selector);

  return block;
}

modalBtn.onclick = function() {
  modal.style.display = "block";

  const blocksDiv = document.getElementById('blocks');
  const blocksCount = blocksDiv.childElementCount;
  const block = createBlock(blocksCount + 1);

  blocksDiv.appendChild(block);
}

/// hide modal window on cancel

cancelBtn.onclick = function() {
  modal.style.display = "none";
}

// filling main

saveBtn.onclick = function() {
  const blocksDiv = document.getElementById('blocks');
  const blocksCount = blocksDiv.childElementCount;
  const block = document.getElementById(blocksCount);

  const row1 = block.childNodes[0];
  const row2 = block.childNodes[1];
  const row3  = block.childNodes[2];

  const h1 = document.createElement('text');
  const inputValue = document.getElementById('inp1').value;
  const t = document.createTextNode(inputValue);
  h1.appendChild(t);
  row1.appendChild(h1);

  document.getElementById('inp1').value = "";

  const h2 = document.createElement('text');
  const inputValue1 = document.getElementById('inp2').value;
  const t1 = document.createTextNode(inputValue1);
  h2.appendChild(t1);
  row2.appendChild(h2);

  document.getElementById('inp2').value = "";

  let erasel = document.getElementById('select3');
  let prior = document.createTextNode( erasel.options[erasel.selectedIndex].text);
  row3.appendChild(prior);

  document.getElementById('select3').value = "";

  block.style.display = 'block';
  modal.style.display = "none";
}

//block search and comparison

function search() {
  const search = document.getElementById('search');
  const blocksDiv = document.getElementById('blocks');
  const searchStr = search.value;
  const erasel = document.getElementById('select1');
  const select1 = erasel.options[erasel.selectedIndex].text;
  const erasell = document.getElementById('select2');
  const select2 = erasell.options[erasell.selectedIndex].text;


  blocksDiv.childNodes.forEach(block => {
    const color = block.style['background-color'];
    const title = block.childNodes[0].childNodes[0].innerText;
    const description = block.childNodes[1].childNodes[0].innerText;
    const priority = block.childNodes[2].innerText;

    if(select1 == 'open') {
      if(color == 'lightgrey') {
        block.style.display = 'none';
        return;
      }
    }else if(select1 == 'done') {
      if(color !== 'lightgrey') {
        block.style.display = 'none';
        return;
      }
    }

    // console.log(title);
    // console.log(description);
    // console.log(priority);

    if(searchStr == '') {
      block.style.display = 'block';
    }
    else if(searchStr !== title && select2 !== priority) {
      block.style.display = 'none';
    }
    else {
      block.style.display = 'block';
    }


  });
}
