

let tipoPago = ['(1) ->Efectivo','(2) -> Debito', '(3) -> Credito','(4) -> Cheque', '(0) -> Salir'];

const registro = [];
let tablaBody = document.getElementById('tablabody');
//let mTotal = document.getElementById('total');
let mTotal = document.getElementById('total').innerText;

let total=0;
let efectivo=0;
let debito=0;
let credito=0;
let cheque=0;


function sumaTotal(monto){
  if(monto>0){
    total+=monto;
    console.log(total);
  }
}

function focusInit() {
    
    document.getElementById("flexRadioEfectivo").focus();
}
  
function devuelveMiles(monto){
    let nuevoMonto = [];

    for (let i = monto.length - 1; i >= 0; i -= 3) {
      let ini = Math.max(0, i - 2);
      let cad = monto.substring(ini, i + 1);
      nuevoMonto.unshift(cad);
    }
  
    return(nuevoMonto.join('.'));
}

function igresaCajero(){
   
    var modalNombre = new bootstrap.Modal(document.getElementById("modalNombre"));

    if(registro ==""){

        // let nombre = prompt('Igrese nombre: ');
        const nombre = document.getElementById('floatingTextareaNombre').value;
        const name = document.getElementById('nombre').innerHTML;
        console.log(nombre);
        document.getElementById('nombre').innerHTML=`
            <h4>${name} ${nombre.toUpperCase()}</h4>
        ` ;
    }
    modalNombre.dispose();  
}


// obtener valor del radio button
const radioOp = document.querySelectorAll('input[name="flexRadioDefault"]');
let valorRadio = "flexRadioEfectivo";
let montoSumando=0
radioOp.forEach(radio => {
  radio.addEventListener('change', function(event) {
    if (event.target.checked) {
      
        valorRadio = radio.id;
        
        console.log('Radio seleccionado:', valorRadio);
    }
  });
});

const botonSuma = document.getElementById('buttonSuma');
botonSuma.onclick = () => {
    console.log('aki suma');
    
    ingresa();
  
    
    document.getElementById('textSuma').value='';
    document.getElementById('textSuma').focus();
}

document.getElementById('textSuma').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        document.getElementById('textSuma').value = ''; 

        console.log('le diste enter');

        ingresa();
    }
});

function SetSubtotal(monto){
    let sub = document.getElementById('badge').innerText;
    console.log( "a la suma " + monto + " - "  +sub)
    document.getElementById('subTotal').innerText = monto + parseFloat(sub);
}

function ingresa(){

    console.log('funcion ingresa')
    
    let op = valorRadio;
    montoSumando=parseFloat(document.getElementById('textSuma').value);
    console.log(montoSumando);
    if(!isNaN(montoSumando)){
        
        while(op != ''){
            switch(op){
                case 'flexRadioEfectivo':
                    // let efect = parseFloat(prompt('Ingrese el efectivo a sumar'));
                    let efect = parseFloat(montoSumando);
                    sumaTotal(efect);
                    efectivo+=efect;
                    agregaMontos(['Efectivo',efect])
                    
                    SetSubtotal(montoSumando)  

                break;
                case 'flexRadioDebito':
                    let debi = parseFloat(montoSumando)
                    sumaTotal(debi);
                    debito+=debi;
                    agregaMontos(['Débito',debi])
                break;
                case 'flexRadioCredito':
                    let credi = parseFloat(montoSumando);
                    sumaTotal(credi);
                    credito+=credi;
                    agregaMontos(['Crédito',credi]);
                break;
                case 'flexRadioCheque':
                    let chec = parseFloat(montoSumando);
                    sumaTotal(chec);
                    cheque+=chec;
                    agregaMontos(['Cheque',chec]);
                break;
                default:
                    alert('Opcion no valida..🤷🏻‍♂️');
                break
                
            }
            
                op= '';
    
        }
        
        let paso= devuelveMiles(String(total));
        document.getElementById('total').innerText = mTotal + paso;
        

    }
}

function agregaMontos(detalle) {
    registro.push(detalle);
    console.table(registro);
    
        tablaBody.innerHTML += `
        <tr>
            <td>${registro.indexOf(detalle)}</td>
            <td>${detalle[0]}</td>
            <td>${detalle[1]}</td>
        </tr>
    `;

}
function elimina(){

    if(registro != ""){
        idMod = parseInt(prompt('ingresa ID del registro que desas eliminar : \n'))
        const num = document.getElementById('tablabody')
       //for(const reg in registro){
            //console.log(num)
            const resultado = registro.map((valor, indice) => {
                // return `Índice ${indice}: ${valor}`;
                //const este = `${valor}`;
                const este2 = `${indice}`
                
                
                if(este2 == idMod){
                    console.log(este2);
                    registro.splice(este2)
                   // location.reload();
                   document.getElementById('tablabody').innerHTML = '';
                    console.log()
                    refresca(este2)
                }
            });
              
    }else{
        alert('Resgistro vacio, imposible modificar..! 🤷🏻‍♂️')
    }
}

function refresca(){
    for(regis in registro){

        console.log(regis)
        agregaMontos(regis)
    }

    agregaMontos(registro)
}