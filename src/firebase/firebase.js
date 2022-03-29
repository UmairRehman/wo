// import { initializeApp } from 'firebase/app';
import firebase from 'firebase';

const config = 
{
  apiKey: "AIzaSyA49mVYSNLXZQqWfq-sJi-MRofZI06u8U8",
  authDomain: "who-s-on.firebaseapp.com",
  projectId: "whos-on-340806",
  private_key_id: "03fdfd6c62e9e3fbab0031fb71fdab3e17d6a0c8",
  storageBucket: "who-s-on.appspot.com",
  messagingSenderId: "1062275279679",
  appId: "1:1062275279679:web:d3402b9b1c819df656c18a",
  measurementId: "G-F5JXL2F3VC",

  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-khrs4%40whos-on-340806.iam.gserviceaccount.com",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  client_id: "106734136842247361117",
  client_email: "firebase-adminsdk-khrs4@whos-on-340806.iam.gserviceaccount.com",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/xyIccKbSo4zV\nfyPLtropI6+SWqu+a3cGnbr+rC50ymJW8lP70GaJ7u7rTCxm4bodCWxIiY1BATn9\nbNOreLQPJzLTlduYAoN6uPpqpo9a+Ub5xKFBOwZeC8N+BMzIte5SwYOl7dUatsNd\nTeJj+5P9Pk+LRl0NQ65UtRr2LkoyF/7fgbeFy1YR0if3DYMCiIpOfeHPwdLXU5ja\n6YWUGP+tsnhLtXkQqDm42pWGVMMKw3jK4W16YWRfmMeabO1UyTX8h1qiK3lQQyOX\nsiQZJReSODhQHk8eTrsqHRseRAo37kuXim0CneAf2o/SEzqxCvukAhW8cXSnlVu+\n7JZbrowZAgMBAAECggEAJ2cZe9jsebpXSRVYjDZEvQejPvGIuHTZjX8yaLmFSQM9\nHcqn1UT+EGiKZ8dslw3ZYLZrLGMwpdLD8K0ft2szKare30i6x9p6W6hucSO8MA+o\nFNDg5edj+UY2+ikvzyxMJW4zp4+8WYMEFGNYeLz7rMxU6ROBsmQ9yRM10S91GKHo\nApuiKm1n7agjI0WH/tj7iDcA1CXjwAqTfB/xElkepqhs12WUV1rMaDUvpdr8GRQN\nc5qTNaPvyCFN05jcTHartSOEtRXCpd3i4o5pgj2Hd7MAVpgALzdkbBG7m5j5VBIE\nB94fl22tlJijRSt+bvZEkMfZmdDfoqzpnTMvfjVclQKBgQD/027Jon+UXR0dUVzq\ndnLwj4ymxgnfgTvfXiRCenVZiuxJUPIXfzwXMeTDTaRtCKpmL1YHAiRp68K0Xg4h\nLz+3Sm9XiMw0ExJRFxZqssJVKNgdyy+o4Af7wgYJpD+rnSEHhZT7NupTMXCNxZLq\ntn60P/mESRj9W3jfuk4wbrt4pQKBgQC/6IrvybRc5hqGubJXA/bewCTmPfRQtH6s\nauo++7raXtmuI6eRIxf7tGuxZYfWNYDVlf9PU/51jGv3PiAWs0zG8wPgbc8y17Rc\nX35Q+ptJkBk2VizujQgddsYbg20o6NRiSXrncfNYQ1wgib8haiYUcovApjK5Ospf\nDSApA3K3ZQKBgQC51OZnRckTBsh9YXrzPfOkV0I+ayEE4CWTzhjcyYOw9b9KSqhw\n9RW7a5zXWfEU2vScocoF8UJuRrn6t0/gPygzhrh2h4J+WVQ232SDQTL1FWRX0B7g\nt0xVTs1/93XgvZUel6RvD6cLo6A0+84K/WHwoYAo3chvUiDts7HUcLtxmQKBgCyh\nHtZ++QP1u0uDmfbkhB/vXWVyGQQ/xYnBX3KARkcMceEuh4SYPbaakcTykLF/RdPm\nCzbemLmri1w3RW0iC4Pk9gzWXK49PcORraWVclGcQlDBn7dmcvGvMokpelReOS4W\nWo/Cj04CdEVY42sY7Xwp21hVDkzHYFLUkZsYIzCFAoGANjL9niGckO3iETFEE7We\n2kgQVoYlpn3CBv8ExgPy1Tlq3ayNZwyfglRNvQ3X1Qq15CGNeRBWhE1ac+NebDSU\nZZ0NrxcmMPZ5HVF/WCOcqxg58qPxeSxJT/KzU5Y5va/FmtOGvEugmOw2VcUHoe0S\njuBkLWXoUTVrK4E09kFHnps=\n-----END PRIVATE KEY-----\n",

};

firebase.initializeApp(config);


export default firebase



