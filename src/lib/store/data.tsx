import { z } from 'zod';
import { create } from 'zustand';
import { DocumentFull } from '../../schemaType';


type DocumentType = z.infer<typeof DocumentFull>

interface DataStore {
  document: DocumentType | null
  setDocument: (doc: DocumentType) => void
  user: {id :string , name : string , email : string } | null
  setUser: (data: {id :string , name : string ,email : string }) => void
}

const useDataStore = create<DataStore>((set) => ({
    document : null,
    user : null,

    setDocument : (data : z.infer<typeof DocumentFull>) => set(()=>({document : data})),
    setUser : ( data : { id : string , name : string , email : string }) => set(()=>({user : data}))

}))



export default useDataStore