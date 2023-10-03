import React from 'react';
import { article } from "./aricles";

export default function Sidebar() {
  return (
    <div className='sidebar-container'>
      <div className="profile-card flex-a-j-center">
        <div className="pb"></div>
        <div className='profile-card-textbox'>
          <p>Nico Puelacher</p>
          <p>Rolle: Programmierer</p>
        </div>
      </div>
      <h1>Quick Select</h1>
      <div className="divider-hor"></div>
      <ul>
        {article.map((item, index) => (
          <li key={index}>
            <a href="">{item.titel}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}