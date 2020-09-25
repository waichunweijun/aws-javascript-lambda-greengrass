let data = {
    uwinloc: { owner_id: 'uwinloc' },
    facets: [{
        facet_id: Math.floor(Math.random() * 1000000000),
        facet_name: 'tag',
        producer_id: 'api',
        creation_time: Date.now(),
        last_modification_time: Date.now(),
        type_semantic: {
            blah: "blahblah"
        },
        type_representation: 'uwl.repr.tag',
        content: [{
            ID: 1234,
            IsLandMark: false,
            Pos: {
                Cart: { X: Math.random(), Y: Math.random(), Z: Math.random() },
                LLA: {
                    Lat: Math.random(),
                    Lon: Math.random(),
                    Alt: Math.random()
                }
            },
            Status: 'ThreeD',
            Reliability: 100,
            Algorithm: 'Placed',
            Filtered: false
        }],
        flight_recorder: null
    }],
    summary: [
        { facet_id: '240c4d8f-c2eb-4d74-8dac-6e6fe6257203', status: 'new' }
    ],
    history: null
};

console.log(JSON.stringify(data));