function start() {
  const element = document.querySelector('#svg-turkiye-haritasi');
  const info = document.querySelector('.il-isimleri');
  var selected = "istanbul";


  element.addEventListener(
    'mouseover',
    function (event) {
      if (event.target.tagName === 'path') {
        const id = event.target.parentNode.getAttribute('id');
        
        var depremAdeti = haritaBilgisi[id].depremler.length > 0 ? haritaBilgisi[id].depremler.length : 0;
        var color = getColor(depremAdeti);

        //renkli highlight
        event.target.style.cssText ="fill:"+color +" !important";

        info.innerHTML = [
          '<div>',
          event.target.parentNode.getAttribute('data-iladi') + 
          "["+depremAdeti+"]",
          '</div>'
        ].join('');
      }
    }
  );

  element.addEventListener(
    'mousemove',
    function (event) {
      info.style.top = event.pageY + 25 + 'px';
      info.style.left = event.pageX + 'px';
    }
  );


  element.addEventListener(
    'mouseout',
    function (event) {
      if(selected != event.target.parentNode.getAttribute('id')){
        event.target.style.cssText ="";
      }
      info.innerHTML = '';
    }
  );

  element.addEventListener(
    'click',
    function (event) {
      if (event.target.tagName === 'path') {
        const parent = event.target.parentNode;
        const id = parent.getAttribute('id');
        const iladi =  parent.getAttribute('data-iladi');
        //console.log("id == " + id);

        //seçilen highlight kaldır
        document.getElementById(selected).firstElementChild.style.cssText ="";

        selected = id;

        //renk atama
        var color = getColor(haritaBilgisi[id].depremler.length);
        event.target.style.cssText ="fill:"+color +" !important";

        //İl Yazısı Animasyon ve isim değişikliği
        let iltitle = document.getElementById("il");
        iltitle.innerHTML = iladi + " İli Yaşanan Depremler";
        iltitle.classList = "lineUp";
        setTimeout(function () {
          iltitle.classList = "";
        }, 800);

        //Tablo Hazırlama
        setTable(haritaBilgisi[id].depremler);
      }
    }
  );

  function setTable(amountOfEq){

    document.getElementById("tbody").innerHTML ="";
    document.getElementById("thead").firstElementChild.firstElementChild.style.borderBottomLeftRadius = "0";

    if(amountOfEq.length > 0){
      
      amountOfEq.map(function(eqInfo, index){

          let tr = document.createElement("tr");
          let td1 = document.createElement("td");
          let td2 = document.createElement("td");
          let td3 = document.createElement("td");
          let td4 = document.createElement("td");
          let td5 = document.createElement("td");

          td1.innerHTML= eqInfo.tarih;
          td2.innerHTML= eqInfo.saat;
          td3.innerHTML= eqInfo.mag;
          td4.innerHTML= eqInfo.can_kaybi;
          td5.innerHTML= eqInfo.hasarli_bina;

          if(index == amountOfEq.length -1){
            td1.style.borderBottomLeftRadius = "2rem";
          }

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);

          //table animation
          tr.classList = "inner start-animation";
          setTimeout(function () {
            tr.classList = "inner";
          }, 50);

          document.getElementById("tbody").appendChild(tr);
      });

  }else{
    document.getElementById("thead").firstElementChild.firstElementChild.style.borderBottomLeftRadius = "2rem";
  }
}

  function getColor(depremAdeti){
    let color = "";
    switch (depremAdeti) {
      case 0:
        color = "#86aadc";
        break;
      case 1:
        color = "#64c572";
        break;
      case 2:
        color = "#dace6c";
        break; 
      case 3:
        color = "#fd9644";
        break;    
      default:
        color = "#fc5c65";
        break;
    }
    return color;
  }

  
const haritaBilgisi ={
  adana:{
    depremler:[
      {
        tarih:"06.02.2023",
        saat:"04.17",
        mag: "7.8",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
      {
        tarih:"06.02.2023",
        saat:"13.24",
        mag: "7.6",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
      {
        tarih:"20.03.1945",
        saat:"09:58",
        mag: "6",
        can_kaybi:"13",
        hasarli_bina:"2500"
      },
      {
        tarih:"22.10.1952",
        saat:"19:00",
        mag: "5.6",
        can_kaybi:"10",
        hasarli_bina:"617"
      },
      {
        tarih:"27.06.1998",
        saat:"16:55",
        mag: "6.2",
        can_kaybi:"146",
        hasarli_bina:"31463"
      }
    ]
  },

  adiyaman:{
    depremler:[]
  },

  afyonkarahisar:{
    depremler:[
      {
        tarih:"01.10.1995",
        saat:"17:57",
        mag: "6.1",
        can_kaybi:"90",
        hasarli_bina:"14156"
      },
      {
        tarih:"7.8.1925",
        saat:"08:46",
        mag: "5.9",
        can_kaybi:"3",
        hasarli_bina:"2043"
      },
      {
        tarih:"15.12.2000",
        saat:"18:44",
        mag: "5.8",
        can_kaybi:"6",
        hasarli_bina:"44"
      },
      {
        tarih:"3.2.2002",
        saat:"09:11",
        mag: "6.4",
        can_kaybi:"44",
        hasarli_bina:"622"
      }
    ]
  },

  agri:{
    depremler:[
      {
        tarih:"2.7.2004",
        saat:"01.30",
        mag: "5.1",
        can_kaybi:"17",
        hasarli_bina:"1000"
      },
    ]
  },

  amasya:{
    depremler:[
      {
        tarih:"14.8.1996",
        saat:"01:55",
        mag: "5.6",
        can_kaybi:"1",
        hasarli_bina:"2606"
      },
    ]
  },

  ankara:{
    depremler:[
      {
        tarih:"20.12.2007",
        saat:"11:48",
        mag: "5.7",
        can_kaybi:"",
        hasarli_bina:""
      },
      {
        tarih:"27.12.2007",
        saat:"01:47",
        mag: "5.5",
        can_kaybi:"",
        hasarli_bina:""
      },
    ]
  },

  antalya:{
    depremler:[
      {
        tarih:"28.12.2013",
        saat:"17:21",
        mag: "6.0",
        can_kaybi:"",
        hasarli_bina:""
      },
    ]
  },

  artvin:{
    depremler:[]
  },

  aydin:{
    depremler:[
      {
        tarih:"16.7.1955",
        saat:"09:07",
        mag: "6.8",
        can_kaybi:"23",
        hasarli_bina:"470"
      },
    ]
  },

  balikesir:{
    depremler:[
      {
        tarih:"6.10.1944",
        saat:"04:34",
        mag: "6.8",
        can_kaybi:"30",
        hasarli_bina:"5500"
      },
      {
        tarih:"15.11.1942",
        saat:"19:01",
        mag: "6.1",
        can_kaybi:"16",
        hasarli_bina:"2187"
      },
      {
        tarih:"4.1.1935",
        saat:"16:41",
        mag: "6.4",
        can_kaybi:"5",
        hasarli_bina:"600"
      },
      {
        tarih:"6.10.1964",
        saat:"16:31",
        mag: "7",
        can_kaybi:"23",
        hasarli_bina:"5398"
      },
    ]
  },

  bilecik:{
    depremler:[]
  },

  bingol:{
    depremler:[
      {
        tarih:"1.5.2003",
        saat:"03:27",
        mag: "6.4",
        can_kaybi:"176",
        hasarli_bina:"6000"
      },
      {
        tarih:"17.8.1949",
        saat:"20:44",
        mag: "6.7",
        can_kaybi:"450",
        hasarli_bina:"3500"
      },
      {
        tarih:"22.5.1971",
        saat:"18:43",
        mag: "6.8",
        can_kaybi:"878",
        hasarli_bina:"9111"
      },
    ]
  },

  bitlis:{
    depremler:[]
  },

  bolu:{
    depremler:[
      {
        tarih:"26.5.1957",
        saat:"08:33",
        mag: "7.1",
        can_kaybi:"52",
        hasarli_bina:"5200"
      },
      {
        tarih:"1.2.1944",
        saat:"05:22",
        mag: "7.2",
        can_kaybi:"3959",
        hasarli_bina:"20865"
      },
    ]
  },


  burdur:{
    depremler:[
      {
        tarih:"12.5.1971",
        saat:"08:25",
        mag: "5.9",
        can_kaybi:"57",
        hasarli_bina:"3227"
      },
      {
        tarih:"30.1.1964",
        saat:"19:45",
        mag: "5.7",
        can_kaybi:"",
        hasarli_bina:"39"
      },
    ]
  },

  bursa:{
    depremler:[]
  },

  canakkale:{
    depremler:[
      {
        tarih:"5.7.1983",
        saat:"15:01",
        mag: "6.1",
        can_kaybi:"3",
        hasarli_bina:"85"
      },
      {
        tarih:"18.3.1953",
        saat:"21:06",
        mag: "7.2",
        can_kaybi:"265",
        hasarli_bina:"6750"
      },
    ]
  },

  cankiri:{
    depremler:[
      {
        tarih:"6.6.2000",
        saat:"05:41",
        mag: "6.1",
        can_kaybi:"1",
        hasarli_bina:"1766"
      },
      {
        tarih:"7.9.1953",
        saat:"05:58",
        mag: "6",
        can_kaybi:"2",
        hasarli_bina:"230"
      },
      {
        tarih:"13.8.1951",
        saat:"20:33",
        mag: "6.9",
        can_kaybi:"50",
        hasarli_bina:"3354"
      },
    ]
  },

  corum:{
    depremler:[
      {
        tarih:"21.11.1942",
        saat:"16.01",
        mag: "5.5",
        can_kaybi:"2",
        hasarli_bina:"150"
      },
    ]
  },

  denizli:{
    depremler:[
      {
        tarih:"13.6.1965",
        saat:"22:01",
        mag: "5.7",
        can_kaybi:"14",
        hasarli_bina:"488"
      },
    ]
  },

  diyarbakir:{
    depremler:[
      {
        tarih:"6.9.1975",
        saat:"12:20",
        mag: "6.6",
        can_kaybi:"2385",
        hasarli_bina:"8149"
      },
      {
        tarih:"06.02.2023",
        saat:"04.17",
        mag: "7.8",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
      {
        tarih:"06.02.2023",
        saat:"13.24",
        mag: "7.6",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
    ]
  },

  edirne:{
    depremler:[]
  },

  elazig:{
    depremler:[
      {
        tarih:"8.3.2010",
        saat:"04:32",
        mag: "6.1",
        can_kaybi:"42",
        hasarli_bina:""
      },
      {
        tarih:"8.3.2010",
        saat:"09:47",
        mag: "5.6",
        can_kaybi:"",
        hasarli_bina:""
      },
      {
        tarih:"21.2.2007",
        saat:"13:05",
        mag: "5.9",
        can_kaybi:"",
        hasarli_bina:""
      },
      {
        tarih:"9.2.2007",
        saat:"04:22",
        mag: "5.5",
        can_kaybi:"",
        hasarli_bina:""
      },
      {
        tarih:"11.8.2004",
        saat:"18:48",
        mag: "5.9",
        can_kaybi:"",
        hasarli_bina:""
      },
    ]
  },

  erzincan:{
    depremler:[
      {
        tarih:"22.9.2011",
        saat:"06:22",
        mag: "5.6",
        can_kaybi:"",
        hasarli_bina:""
      },
      {
        tarih:"13.3.1992",
        saat:"19:08",
        mag: "6.8",
        can_kaybi:"653",
        hasarli_bina:"8057"
      },
      {
        tarih:"12.11.1941",
        saat:"12:04",
        mag: "5.9",
        can_kaybi:"15",
        hasarli_bina:""
      },
      {
        tarih:"27.12.1939",
        saat:"01:57",
        mag: "7.9",
        can_kaybi:"32968",
        hasarli_bina:"116720"
      },
    ]
  },

  erzurum:{
    depremler:[
      {
        tarih:"25.3.2004",
        saat:"21:30",
        mag: "5.6",
        can_kaybi:"9",
        hasarli_bina:"1280"
      },
      {
        tarih:"18.9.1984",
        saat:"15:26",
        mag: "6.4",
        can_kaybi:"3",
        hasarli_bina:"570"
      },
      {
        tarih:"30.10.1983",
        saat:"07:12",
        mag: "6.9",
        can_kaybi:"1155",
        hasarli_bina:"3241"
      },
    ]
  },

  eskisehir:{
    depremler:[
      {
        tarih:"20.2.1956",
        saat:"22:31",
        mag: "6.4",
        can_kaybi:"1",
        hasarli_bina:"2819"
      },
    ]
  },

  gaziantep:{
    depremler:[
      {
        tarih:"11.02.2023",
        saat:"10:55",
        mag: "4.5",
        can_kaybi:"",
        hasarli_bina:""
      },
      {
        tarih:"06.02.2023",
        saat:"04.17",
        mag: "7.8",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
      {
        tarih:"06.02.2023",
        saat:"13.24",
        mag: "7.6",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
    ]
  },
  

  nevsehir:{
    depremler:[]
  },

  samsun:{
    depremler:[]
  },

  giresun:{
    depremler:[]
  },

  gumushane:{
    depremler:[]
  },

  hakkari:{
    depremler:[
      {
        tarih:"25.1.2005",
        saat:"18:44",
        mag: "5.9",
        can_kaybi:"",
        hasarli_bina:""
      },
    ]
  },

  hatay:{
    depremler:[
      {
        tarih:"06.02.2023",
        saat:"04.17",
        mag: "7.8",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
      {
        tarih:"06.02.2023",
        saat:"13.24",
        mag: "7.6",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
      {
        tarih:"22.1.1997",
        saat:"17:57",
        mag: "5.4",
        can_kaybi:"1",
        hasarli_bina:"5200"
      },
    ]
  },

  isparta:{
    depremler:[]
  },

  mersin:{
    depremler:[]
  },

  istanbul:{
    depremler:[
      {
        tarih:"17.8.1999",
        saat:"03:01",
        mag: "7.8",
        can_kaybi:"17480",
        hasarli_bina:"73342"
      },
      {
        tarih:"18.9.1963",
        saat:"18:58",
        mag: "6.3",
        can_kaybi:"1",
        hasarli_bina:"230"
      },
    ]
  },

  izmir:{
    depremler:[
      {
        tarih:"30.10.2020",
        saat:"14:51",
        mag: "7",
        can_kaybi:"117",
        hasarli_bina:"10"
      },
      {
        tarih:"17.10.2005",
        saat:"08:45",
        mag: "5.7",
        can_kaybi:"",
        hasarli_bina:""
      },
      {
        tarih:"6.11.1992",
        saat:"21:08",
        mag: "6",
        can_kaybi:"",
        hasarli_bina:"55"
      },
      {
        tarih:"6.4.1969",
        saat:"05:49",
        mag: "5.9",
        can_kaybi:"",
        hasarli_bina:"1360"
      },
    ]
  },

  kars:{
    depremler:[
      {
        tarih:"7.12.1988",
        saat:"09:41",
        mag: "6.9",
        can_kaybi:"4",
        hasarli_bina:"546"
      },
      {
        tarih:"30.10.1983",
        saat:"07:12",
        mag: "6.9",
        can_kaybi:"1155",
        hasarli_bina:"3241"
      },
    ]
  },

  kastamonu:{
    depremler:[]
  },

  kayseri:{
    depremler:[
      {
        tarih:"13.4.1940",
        saat:"08:29",
        mag: "5.6",
        can_kaybi:"",
        hasarli_bina:"1000"
      },
    ]
  },

  kirklareli:{
    depremler:[]
  },

  kirsehir:{
    depremler:[
      {
        tarih:"19.4.1938",
        saat:"12:59",
        mag: "6.6",
        can_kaybi:"160",
        hasarli_bina:"4066"
      },
    ]
  },

  kocaeli:{
    depremler:[
      {
        tarih:"17.8.1999",
        saat:"03:01",
        mag: "7.8",
        can_kaybi:"17480",
        hasarli_bina:"73342"
      },
    ]
  },

  konya:{
    depremler:[
      {
        tarih:"21.2.1946",
        saat:"17:43",
        mag: "5.5",
        can_kaybi:"12",
        hasarli_bina:"3349"
      },
    ]
  },

  kutahya:{
    depremler:[
      {
        tarih:"19.5.2011",
        saat:"23:15",
        mag: "5.9",
        can_kaybi:"3",
        hasarli_bina:""
      },
      {
        tarih:"19.4.1970",
        saat:"15:29",
        mag: "5.8",
        can_kaybi:"",
        hasarli_bina:"1360"
      },
      {
        tarih:"28.3.1970",
        saat:"23:02",
        mag: "7.2",
        can_kaybi:"1086",
        hasarli_bina:"19291"
      },
    ]
  },
  
  malatya:{
    depremler:[
      {
        tarih:"6.6.1986",
        saat:"13:39",
        mag: "5.6",
        can_kaybi:"1",
        hasarli_bina:"1174"
      },
      {
        tarih:"5.5.1986",
        saat:"06:35",
        mag: "5.9",
        can_kaybi:"7",
        hasarli_bina:"827"
      },
      {
        tarih:"14.6.1964",
        saat:"13:39",
        mag: "6",
        can_kaybi:"8",
        hasarli_bina:"847"
      },
    ]
  },

  manisa:{
    depremler:[
      {
        tarih:"28.1.1994",
        saat:"17:45",
        mag: "5.1",
        can_kaybi:"",
        hasarli_bina:"44"
      },
      {
        tarih:"28.3.1970",
        saat:"03:48",
        mag: "6.5",
        can_kaybi:"53",
        hasarli_bina:"3072"
      },
      {
        tarih:"23.3.1969",
        saat:"23:08",
        mag: "5.9",
        can_kaybi:"",
        hasarli_bina:"945"
      },
    ]
  },

  kahramanmaras:{
    depremler:[
      {
        tarih:"06.02.2023",
        saat:"04.17",
        mag: "7.8",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
      {
        tarih:"06.02.2023",
        saat:"13.24",
        mag: "7.6",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
    ]
  },

  mardin:{
    depremler:[]
  },

  mugla:{
    depremler:[
      {
        tarih:"23.5.1961",
        saat:"04:45",
        mag: "6.3",
        can_kaybi:"",
        hasarli_bina:"61"
      },
      {
        tarih:"25.4.1959",
        saat:"02:26",
        mag: "5.9",
        can_kaybi:"",
        hasarli_bina:"775"
      },
      {
        tarih:"25.4.1957",
        saat:"04:25",
        mag: "7.1",
        can_kaybi:"67",
        hasarli_bina:"3200"
      },
      {
        tarih:"23.5.1941",
        saat:"21:51",
        mag: "6",
        can_kaybi:"",
        hasarli_bina:"200"
      },
    ]
  },

  mus:{
    depremler:[
      {
        tarih:"19.8.1966",
        saat:"14:22",
        mag: "6.9",
        can_kaybi:"2396",
        hasarli_bina:"20,007"
      },
    ]
  },

  nigde:{
    depremler:[]
  },

  ordu:{
    depremler:[]
  },

  rize:{
    depremler:[]
  },

  sakarya:{
    depremler:[]
  },

  sakarya:{
    depremler:[
      {
        tarih:"22.07.1967",
        saat:"18:56",
        mag: "6.8",
        can_kaybi:"89",
        hasarli_bina:"7116"
      },
      {
        tarih:"27.11.1943",
        saat:"00:20",
        mag: "7.2",
        can_kaybi:"4000",
        hasarli_bina:"40000"
      },
    ]
  },

  siirt:{
    depremler:[]
  },
  
  sinop:{
    depremler:[]
  },

  sivas:{
    depremler:[]
  },

  tekirdag:{
    depremler:[
      {
        tarih:"9.8.1912",
        saat:"03:29",
        mag: "7.3",
        can_kaybi:"216",
        hasarli_bina:"5540"
      },
    ]
  },


  tokat:{
    depremler:[
      {
        tarih:"20.12.1942",
        saat:"16:03",
        mag: "7",
        can_kaybi:"3000",
        hasarli_bina:"32000"
      },
    ]
  },

  trabzon:{
    depremler:[]
  },

  tunceli:{
    depremler:[
      {
        tarih:"27.1.2003",
        saat:"07:26",
        mag: "6.2",
        can_kaybi:"1",
        hasarli_bina:"50"
      },
      {
        tarih:"5.12.1995",
        saat:"18:49",
        mag: "5.7",
        can_kaybi:"1",
        hasarli_bina:""
      },
      {
        tarih:"15.3.1992",
        saat:"18:16",
        mag: "5.8",
        can_kaybi:"",
        hasarli_bina:"439"
      },
      {
        tarih:"26.7.1967",
        saat:"20:53",
        mag: "5.9",
        can_kaybi:"97",
        hasarli_bina:"1282"
      },

    ]
  },
  
  sanliurfa:{
    depremler:[
      {
        tarih:"06.02.2023",
        saat:"04.17",
        mag: "7.8",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
      {
        tarih:"06.02.2023",
        saat:"13.24",
        mag: "7.6",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
    ]
  },

  usak:{
    depremler:[
      {
        tarih:"25.6.1944",
        saat:"06:16",
        mag: "6",
        can_kaybi:"21",
        hasarli_bina:"3476"
      },
    ]
  },

  van:{
    depremler:[
      {
        tarih:"9.11.2011",
        saat:"21:23	",
        mag: "5.6",
        can_kaybi:"40",
        hasarli_bina:""
      },
      {
        tarih:"23.10.2011",
        saat:"13:41",
        mag: "7.2",
        can_kaybi:"644",
        hasarli_bina:"17005"
      },
      {
        tarih:"24.11.1976",
        saat:"14:22",
        mag: "7.5",
        can_kaybi:"3840",
        hasarli_bina:"9232"
      },
    ]
  },

  yozgat:{
    depremler:[
      {
        tarih:"13.4.1940",
        saat:"08:29",
        mag: "5.6",
        can_kaybi:"",
        hasarli_bina:"1000"
      },
    ]
  },

  zonguldak:{
    depremler:[
      {
        tarih:"3.9.1968",
        saat:"10:19",
        mag: "6.5",
        can_kaybi:"29",
        hasarli_bina:"2478"
      },
    ]
  },

  aksaray:{
    depremler:[]
  },

  bayburt:{
    depremler:[]
  },

  karaman:{
    depremler:[]
  },

  kirikkale:{
    depremler:[]
  },

  batman:{
    depremler:[]
  },

  sirnak:{
    depremler:[
      {
        tarih:"14.6.2012",
        saat:"08:52",
        mag: "5.5",
        can_kaybi:"",
        hasarli_bina:""
      },
    ]
  },

  bartin:{
    depremler:[
      {
        tarih:"3.9.1968",
        saat:"10:19",
        mag: "6.5",
        can_kaybi:"29",
        hasarli_bina:"2478"
      },
    ]
  },
  
  ardahan:{
    depremler:[]
  },

  igdir:{
    depremler:[]
  },

  yalova:{
    depremler:[]
  },

  karabuk:{
    depremler:[]
  },

  kilis:{
    depremler:[
      {
        tarih:"06.02.2023",
        saat:"04.17",
        mag: "7.8",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
      {
        tarih:"06.02.2023",
        saat:"13.24",
        mag: "7.6",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
    ]
  },

  osmaniye:{
    depremler:[
      {
        tarih:"06.02.2023",
        saat:"04.17",
        mag: "7.8",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
      {
        tarih:"06.02.2023",
        saat:"13.24",
        mag: "7.6",
        can_kaybi:"45.089",
        hasarli_bina:"214.000"
      },
      {
        tarih:"25.6.2001",
        saat:"16:28",
        mag: "5.5",
        can_kaybi:"",
        hasarli_bina:"66"
      },
    ]
  },

  duzce:{
    depremler:[
      {
        tarih:"12.11.1999",
        saat:"18:57",
        mag: "7.5",
        can_kaybi:"763",
        hasarli_bina:"35519"
      },
    ]
  },

  kibris:{
    depremler:[]
  },
}

document.getElementById("istanbul").firstElementChild.style.cssText ="fill: #dace6c";
}
