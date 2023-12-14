import { Language } from './../components/icon';
import {create} from 'zustand'

interface LocaleState {
    Language:{
        lang:'en'|'ja'
    }
    updateLang: (locale:'en'|'ja') => void,
  }
  
  const storedLang = localStorage.getItem('locale');
// check nếu storage có data không? 

// check nếu storage có data không? 
const lang: "jp" | "en" = (storedLang === "jp" || storedLang === "en") ? storedLang : "en";

// export const userStore = create<LocaleState>((set)=>({
//     Language:{ lang: storedLang }

// }))