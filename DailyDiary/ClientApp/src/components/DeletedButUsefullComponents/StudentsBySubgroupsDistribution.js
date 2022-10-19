import React from 'react'
import StudentsTable from './StudentsTable';
import { Host } from '../Host'
class StudentsBySubgroupsDistribution extends React.Component { //розбиття студентів по підгрупах, створення нової підгрупи для групи
    constructor(props) {
        super(props);

        this.getAllGroups = this.getAllGroups.bind(this);
        this.getAllStudentsBySubroupId = this.getAllStudentsBySubroupId.bind(this);
        this.getAllStudentsByGroupId = this.getAllStudentsByGroupId.bind(this);
        this.getSubgroupBlocks = this.getSubgroupBlocks.bind(this);

        // this.getAllStudentsWithoutGroupThisStudyYear = this.getAllStudentsWithoutGroupThisStudyYear.bind(this);
        // this.onFormSubmit = this.onFormSubmit.bind(this);
        this.addSelectedStudentsInSubgroup = this.addSelectedStudentsInSubgroup.bind(this);
        this.addSubgroupIntoGroup = this.addSubgroupIntoGroup.bind(this);
        this.onSubmitNewSubgroupForm = this.onSubmitNewSubgroupForm.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.onSubgroupChange = this.onSubgroupChange.bind(this);
        this.onSubgroupBlockChange = this.onSubgroupBlockChange.bind(this);
        this.onSubgroupTitleChange = this.onSubgroupTitleChange.bind(this);

        this.ChildElementStudentsArray = React.createRef();

        this.state = {
            groupId: 0,
            subgroupId: 0,
            studentsToAddId: [],
            subgroupTitle: "",
            subgroupBlockTitle: "",
            subgroupBlocks: [],
            groups: [],
            subgroups: [],
            groupStudents: [],
            subgroupStudents: [],
        }
    };
    componentDidMount() {
        this.getAllGroups();
        this.getSubgroupBlocks();
        // this.getAllStudentsWithoutGroupThisStudyYear();
    }
    getDatasToAdd = () => {
        const childelement = this.ChildElementStudentsArray.current;
        if (childelement.state.studentsToAdd != null && childelement.state.studentsToAdd <= 0) {
            alert("No one student selected!");
        }
        else {
            const groupId = document.getElementById('group');
            if (groupId == undefined) {
                alert("Group not found");
                return 0;
            }
            const subgroupId = document.getElementById('subgroup');
            if (subgroupId == undefined) {
                alert("Subgroup not found");
                return 0;
            }
            this.setState({
                groupId: groupId.value,
                subgroupId: subgroupId.value,
                studentsToAddId: childelement.state.studentsToAdd
            },
                () => this.addSelectedStudentsInSubgroup())
            alert("Selected students id:  " + childelement.state.studentsToAdd);
        }
    }
    async addSelectedStudentsInSubgroup() {
        try {
            const datasToSend = {
                groupId: this.state.groupId,
                subgroupId: this.state.subgroupId,
                studentsId: this.state.studentsToAddId
            }
            console.log(datasToSend)
            const response = await fetch(`${Host}/api/subgroup/addStudents`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            });
            if (response.ok === true) {
                window.alert("Added");
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getAllGroups() {
        try {
            const response = await fetch(`${Host}/api/group/getAllGroupsDatasOfCurrentStudyYear`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    groups: data
                }
                    , () => this.getGroupSubgroups(data[0].groupId))
                this.getAllStudentsByGroupId(data[0].groupId);
                this.setState({
                    groupId: data[0].groupId
                })
                console.log("recieved groups: ", data)
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getGroupSubgroups(groupId) {
        try {
            const response = await fetch(`${Host}/api/subgroup/getAllExceptDefaultByGroupId/${groupId}`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    subgroups: data
                }
                    // , () => this.getAllStudentsBySubroupId(data[0].id)
                )
                if (data.length > 0) {
                    this.getAllStudentsBySubroupId(data[0].id)
                }
                else {
                    this.setState({
                        subgroupStudents: []
                    })
                }

                console.log("recieved subgroups: ", data)
            }
            else {
                this.setState({
                    subgroups: []
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }

    async getAllStudentsByGroupId(groupId) {
        try {
            const response = await fetch(`${Host}/api/student/getAllByGroupId/${groupId}`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    groupStudents: data
                })
                console.log("recieved groupStudents: ", data)
            }
            else {
                this.setState({
                    groupStudents: []
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getAllStudentsBySubroupId(subgroupId) {
        try {
            const response = await fetch(`${Host}/api/student/getAllBySubroupId/${subgroupId}`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    subgroupStudents: data
                })
                console.log("recieved subgroupStudents: ", data)
            }
            else {
                this.setState({
                    subgroupStudents: []
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getSubgroupBlocks() {
        try {
            const response = await fetch(`${Host}/api/subgroupBlock/getAll`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    subgroupBlocks: data
                })
                console.log("recieved subgroupBlocks: ", data)
            }
            else {
                this.setState({
                    subgroupBlocks: []
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async addSubgroupIntoGroup() {
        try {
            const datasToSend = {
                subgroupId: 0,
                subgroupTitle: this.state.subgroupTitle,
                subgroupBlockTitle: this.state.subgroupBlockTitle,
                groupId: this.state.groupId
            }
            const response = await fetch(`${Host}/api/subgroup/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            });
            if (response.ok === true) {
                window.alert("Subgroup created successfully");
                this.getGroupSubgroups(this.state.groupId);
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    onGroupChange(e) {
        console.log(e.target.value);

        this.setState({
            groupId: e.target.value
        })
        this.getGroupSubgroups(e.target.value)
        this.getAllStudentsByGroupId(e.target.value);
    }
    onSubgroupChange(e) {
        this.setState({
            subgroupId: e.target.value
        })
        this.getAllStudentsBySubroupId(e.target.value)
    }
    onSubmitNewSubgroupForm(e) {
        e.preventDefault();
        // console.log(e.target.elements);
        const { newSubgroup, subgroupBlock } = e.target
        this.setState({
            subgroupTitle: newSubgroup.value,
            subgroupBlockTitle: subgroupBlock.value
        }
            , () => this.addSubgroupIntoGroup()
        )
    }
    onSubgroupTitleChange(e) {
        console.log(e.target.value)
        var output = e.target.value.split('');
        for (let i = 0; i < output.length; i++) {
            if (output[i] === ' ') {
                output[i] = '_'
            }
        }
        e.target.value = output.join('');
        console.log(e.target.value)
    }
    onSubgroupBlockChange(e) {
        console.log(e.target.value)
        
    }
    render() {
        return (
            <div className='container'>
                <div>Groups:</div>
                <div className="col-md">
                    <div className="form-floating">
                        <select id="group" name="group" className="form-select" onChange={(e) => this.onGroupChange(e)} required>
                            {this.state.groups.map(group =>
                                <option key={"group" + group.groupId} value={group.groupId}>{group.groupTitle}</option>
                            )}
                        </select>
                        <label htmlFor="group">Groups</label>
                    </div>
                </div>
                <form onSubmit={this.onSubmitNewSubgroupForm} className='d-flex flex-row'>
                    <div className='form-group d-flex justify-content-around'>
                        <div className="form-floating">
                            <input type='text' id='newSubgroup' name='newSubgroup' className="form-control" onChange={(e) => this.onSubgroupTitleChange(e)} />
                            <label htmlFor="newSubgroup">Subgroup</label>
                        </div>
                        <div className="form-floating">
                            <datalist id="subgroupBlock">
                                {this.state.subgroupBlocks.map(subgroupBlock =>
                                    <option key={"subgroupBlock_" + subgroupBlock.id} value={subgroupBlock.subgroupBlockTitle}/>
                                    // <option key={"subgroupBlock_" + subgroupBlock.id} value={subgroupBlock.subgroupBlockTitle + subgroupBlock.id}>{subgroupBlock.subgroupBlockTitle}</option>
                                )}
                                {/* value='{"values":[subgroupBlock.subgroupBlockTitle,subgroupBlock.subgroupBlockTitle]}' */}
                            </datalist>
                            <input type="text" name="subgroupBlock" autoComplete="on" className="form-control" list="subgroupBlock" onChange={(e)=> this.onSubgroupBlockChange(e)} />
                            <label htmlFor="subgroupBlock">Subgroup block</label>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-success" value="Create new subgroup" />
                </form>
                {this.state.groupStudents.length > 0 ?
                    <div className='d-flex flex-column'>
                        <div>Students in group:</div>
                        <StudentsTable ref={this.ChildElementStudentsArray} students={this.state.groupStudents}></StudentsTable>
                        <button className='btn btn-primary justify-self-end' onClick={this.getDatasToAdd}>Add selected in subgroup</button>
                    </div>
                    :
                    <></>
                }
                <div>Subroups:</div>
                <div className="col-md">
                    <div className="form-floating">
                        <select id="subgroup" name="subgroup" className="form-select" onChange={(e) => this.onSubgroupChange(e)} required>
                            {this.state.subgroups.length > 0 ? this.state.subgroups.map(subgroup =>
                                <option key={"subgroup" + subgroup.id} value={subgroup.id}>{subgroup.title}</option>
                            ) : <></>}
                        </select>
                        <label htmlFor="subgroup">Subgroups</label>
                    </div>
                </div>
                {this.state.subgroupStudents.length > 0 ?
                    <div>
                        <div>Students in subgroup:</div>
                        <StudentsTable students={this.state.subgroupStudents}></StudentsTable>
                    </div>
                    :
                    <></>
                }
            </div>
        )
    }
}
export default StudentsBySubgroupsDistribution;