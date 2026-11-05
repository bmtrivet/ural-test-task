import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useGetOffersQuery, useSearchBrandsQuery } from "./api/partsApi";
import { useDebounce } from "./hooks/useDebounce";
import SearchForm from "./components/SearchForm";
import BrandList from "./components/BrandList";
import OffersTable from "./components/OffersTable";
import QueryView from "./components/QueryView";

const MIN_LENGTH = 3;
const DEBOUNCE_TIME = 500;

export default function App() {
  const [article, setArticle] = useState("");
  const [selected, setSelected] = useState(null);

  const number = useDebounce(article.trim(), DEBOUNCE_TIME);
  const brands = useSearchBrandsQuery(
    number.length >= MIN_LENGTH ? number : skipToken,
  );
  const offers = useGetOffersQuery(
    selected ? { number: selected.number, brand: selected.brand } : skipToken,
  );

  const handleArticleChange = (value) => {
    setArticle(value);
    setSelected(null);
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Поиск автозапчастей и аналогов</h1>

      <SearchForm value={article} onChange={handleArticleChange} />

      <div className="row g-4">
        <div className="col-lg-4">
          <h2 className="h5">Производители</h2>
          <QueryView
            query={brands}
            idleText="Введите артикул, чтобы увидеть производителей."
            emptyText={`Производители по артикулу «${number}» не найдены.`}
          >
            {(items) => (
              <BrandList
                items={items}
                selected={selected}
                onSelect={setSelected}
              />
            )}
          </QueryView>
        </div>

        <div className="col-lg-8">
          <h2 className="h5">Аналоги и предложения</h2>
          <QueryView
            query={offers}
            idleText="Выберите производителя из списка."
            emptyText="Предложений нет."
          >
            {(items) => <OffersTable offers={items} />}
          </QueryView>
        </div>
      </div>
    </div>
  );
}
