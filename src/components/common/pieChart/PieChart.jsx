import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';


const CustomPieChart = ({data, width=150, height=200, innerRadius=40, outerRadius=60, colors={} , showLabel=false, legendType='line' }) => {

    // Проверяем, есть ли данные
    const hasData = data && data.length > 0;

    // Если данных нет, создаем данные для серого круга
    const chartData = hasData? data: [{name: "No Data", value: 1}];


    const renderCustomizedLabel = (props) => {
        if (!hasData) return null; // Не отображаем лейблы, если данных нет
    
        const { cx, cy, midAngle, innerRadius, outerRadius, payload } = props;
        const RADIAN = Math.PI / 180;
    
        // Расчет позиции лейбла
        const radius = innerRadius + (outerRadius - innerRadius) * 1.5; // Регулируйте коэффициент для изменения расстояния от круга
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        // Данные для лейбла
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


CustomPieChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    innerRadius: PropTypes.string,
    colors: PropTypes.object,
    showLabel: PropTypes.bool,
    legendType: PropTypes.string,
}

export default CustomPieChart;
