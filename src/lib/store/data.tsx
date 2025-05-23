import { z } from 'zod';
import { create } from 'zustand';
import { DocumentFull } from '../../schemaType';


type DocumentType = z.infer<typeof DocumentFull>

interface DataStore {
  document: DocumentType | null
  setDocument: (doc: DocumentType) => void
}

const useDataStore = create<DataStore>((set) => ({
    document : null,

    setDocument : (data : z.infer<typeof DocumentFull>) => set(()=>({document : data}))

}))

export default useDataStore