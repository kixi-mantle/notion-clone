import React from 'react'
import ClientWrapper from './ClientWrapper'
import { getDocument } from '../../../../../../../drizzle/queries/document'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { orgId: string; documentId: string } }) {
  const { documentId } = await params;
  const document = await getDocument(documentId);

  if (!document) {
    console.log('document not found');
    notFound();
  }

  return (
    <div>
      <ClientWrapper docInfo={document} docId = {documentId}/>
    </div>
  );
}
