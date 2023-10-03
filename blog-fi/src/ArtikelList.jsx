import React, { useState } from 'react';
import { article } from './aricles';

export default function ArtikelList() {

  const articles = article

  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className='list-container'>
      <h1>Artikel</h1>

      {articles.map((item, index) => (
        <div key={index} className="article-card flex-a-center-j-between">
          <div>
            <div className="flex">
              <img src={item.image} alt={item.titel} />
              <div>
                <h1>{item.titel}</h1>
                <p>{item.beschreibung}</p>
              </div>
            </div>
          </div>

          <button className='btn' onClick={() => setSelectedArticle(item)}>Read</button>
        </div>
      ))}
    </div>
  );
}