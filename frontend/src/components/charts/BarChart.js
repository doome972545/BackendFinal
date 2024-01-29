import { ResponsiveBar } from '@nivo/bar'
import React from 'react'

const BarChart = ({ data }) => {
    return (
        <ResponsiveBar
            data={data}
            keys={['ชาย', 'หญิง']}
            indexBy='gender'
            margin={{ top: 10, right: 100, bottom: 80, left: 60 }}
            padding={0.3}
            colors={{ scheme: 'pastel1' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'เพศ',
                legendPosition: 'middle',
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'จำนวนผู้ป่วย',
                legendPosition: 'middle',
                legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemTextColor: '#000',
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000',
                            },
                        },
                    ],
                },
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    )
}

export default BarChart
