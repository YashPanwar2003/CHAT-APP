import { Search } from "lucide-react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative w-full grow md:w-2/3 lg:w-auto">
      {/* Search Icon inside input */}
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 pointer-events-none"
      />

      {/* Input field with padding to make room for icon */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="
          w-full bg-neutral-800 text-white border-none focus:outline-none rounded-2xl
          pl-10 pr-4 py-2
          text-md font-medium placeholder:text-neutral-400
          transition-all duration-200
        "
      />
    </div>
  );
};

export default SearchBar;
