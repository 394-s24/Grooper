

const setInitialSubgroup = (subgroup) => {
    const initialSubgroup = {
        id: 1,
        topic: "Team members",
        members: subgroup.map(obj => obj.first_name),
    }

    return initialSubgroup;
    }

export default setInitialSubgroup;