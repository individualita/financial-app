import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const CustomPieChart = ({data, width=150, height=200, innerRadius=40, outerRadius=60, colors={} , showLabel=false, legendType='line' }) => {

    const hasData = data && data.length > 0;

    // Если данных нет, создаем данные для серого круга. If there is no data, create data for the gray circle.
    const chartData = hasData? data: [{name: "No Data", value: 1}];


    const renderCustomizedLabel = (props) => {
        if (!hasData) return null; // Не отображаем лейблы, если данных нет. Do not display labels if there is no data.
    
        const { cx, cy, midAngle, innerRadius, outerRadius, payload } = props;
        const RADIAN = Math.PI / 180;
    
        // Расчет позиции лейбла . Label position. 
        const radius = innerRadius + (outerRadius - innerRadius) * 1.5; // Регулирует коэффициент для изменения расстояния от круга Adjusts the coefficient that changes the distance from the circle
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        // Данные для лейбла. Data for label
        const name = payload.name;
        const percentage = payload.percentage;
    
        return (
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: '10px', fontWeight: '500' }} // Настройка размера шрифта и стилей
            >
                {`${name}: ${percentage}%`}
            </text>
        );
    };

    const customLabel = hasData && showLabel ? renderCustomizedLabel: null;

    return (
        <PieChart width={width} height={height} >
            <Pie
                data={chartData}
                dataKey={"value"}
                nameKey={"name"}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill="#d3d3d3"
                legendType={legendType}
                label={customLabel}
            >
                {chartData.map((entry, index) => {
                    const color = hasData? colors[entry.name] || "#cccccc" : "d3d3d3";
                    return <Cell key={`cell-${index}`} fill={color}/>
                })}   

            </Pie>
            {hasData ? (
                <>
                    <Tooltip contentStyle={{fontSize: '12px'}} formatter={(value, name, props) => {
                        const percentage = props.payload.percentage;
                        return [`${percentage}%`, name];
                    }}/> {/* Показываем информацию о сегменте при наведении */}
                    <Legend wrapperStyle={{fontSize: '10px'}}/>
                </>
            ) : (
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{fontSize: '12px', fill:'#888'}}
                >
                    No data Available.
                </text>
            )};

        </PieChart>
            
    );
};


export default CustomPieChart;
