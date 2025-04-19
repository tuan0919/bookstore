type FilterType = {
        sortBy: string,
        ageRange: string,
        priceRange :string
}
interface FilterProps {
    filters :FilterType
    setFilters : React.Dispatch<React.SetStateAction<FilterType>>;
}
function Filter({ filters, setFilters }: FilterProps) { 
    const ageOptions = [
        { label: "8 - 12 tuổi", value: "8-12" },
        { label: "12 - 14 tuổi", value: "12-14" },
        { label: "16 tuổi trở lên", value: "16+" },
      ];
    
      const priceOptions = [
        { label: "0 - 150.000đ", value: "0-150000" },
        { label: "150.000 - 300.000đ", value: "150000-300000" },
        { label: "300.000 - 500.000đ", value: "300000-500000" },
        { label: "500.000 - 700.000đ", value: "500000-700000" },
        { label: "700.000đ trở lên", value: "700000+" },
      ];
    const changeOptionFilter = (key: keyof typeof filters, value:string)=>{
        setFilters((preValue)=>({
            ...preValue,
            [key]:value
        })
            
        )
    }
    return (
        <div style={{ height:"auto", padding: "16px", backgroundColor:"#fff", borderRadius:"8px", boxShadow:"0 2px 4px rgba(0,0,0,0.1)"}}>
        <h3>Lọc theo độ tuổi</h3>
        {ageOptions.map((option) => (
          <div style={{ padding: "10px,5px",fontSize:"16px", marginBottom:"5px"}} key={option.value}>
            <label>
              <input
                style={{width:"15px", height:"15px"}}
                type="checkbox"
                checked={filters.ageRange === option.value}
                onChange={() => changeOptionFilter("ageRange", option.value)}
              />
              {option.label}
            </label>
          </div>
        ))}
  
        <h3 style={{ marginTop: "20px" }}>Lọc theo giá</h3>
        {priceOptions.map((option) => (
          <div style={{ padding: "10px,5px",fontSize:"16px", marginBottom:"5px"}} key={option.value}>
            <label>
              <input
               style={{width:"15px", height:"15px"}}
                type="checkbox"
                checked={filters.priceRange === option.value}
                onChange={() => changeOptionFilter("priceRange", option.value)}
              />
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
    }
export default Filter;