import { useState } from "react"
import '../ui/Header.css'
import { useDispatch } from "react-redux";
import { setShowCatalogSideBar } from "../../reducer/settingsStore";

export const Catalog = () => {
  const dispatch = useDispatch();

  const toggleSideBar = () => dispatch(setShowCatalogSideBar(true));

  return (
    <div className="catalog-btn-container">
      <button className="catalog-button" onClick={toggleSideBar}>
        Каталог
      </button>
    </div>
  )
}