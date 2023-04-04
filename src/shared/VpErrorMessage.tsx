
import React from 'react'

const VpErrorMessage = ({ data }: { data: unknown }) => (
    <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
)

 export default VpErrorMessage
