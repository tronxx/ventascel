function registrarapp(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAhVbLW5CM3k-F1tiITpiSGEgVmCO88RNE",
      authDomain: "ventasta-74ada.firebaseapp.com",
      databaseURL: "https://ventasta-74ada.firebaseio.com",
      projectId: "ventasta-74ada",
      storageBucket: "ventasta-74ada.appspot.com",
      messagingSenderId: "30232732447",
      appId: "1:30232732447:web:bfe174581c6de8c33e862a",
      measurementId: "G-GJGW49Q4MN"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  
}
