import React from 'react'
import StudentsTable from './StudentsTable';
import { Host } from '../Host'
class FullGroupEditing extends React.Component { //розбиття студентів по підгрупах, створення нової підгрупи для групи, розподілення студентів по групах
    constructor(props) {
        super(props);

        this.getAllGroups = this.getAllGroups.bind(this); //всі групи теперішнього навчального року
        this.getAllStudentsWithoutGroupThisStudyYear = this.getAllStudentsWithoutGroupThisStudyYear.bind(this);
        this.getAllStudentsBySubroupId = this.getAllStudentsBySubroupId.bind(this); // всі студенти підгрупи
        this.getAllStudentsByGroupId = this.getAllStudentsByGroupId.bind(this); // всі студенти групи
        this.getSubgroupBlocks = this.getSubgroupBlocks.bind(this); // принципи розбиття групи на підгрупи

        this.addStudentsIntoGroup = this.addStudentsIntoGroup.bind(this); // додати обраних студентів без групи в групу
        this.addSelectedStudentsInSubgroup = this.addSelectedStudentsInSubgroup.bind(this); // додати обраних студентів групи до підгрупи
        this.addSubgroupIntoGroup = this.addSubgroupIntoGroup.bind(this); // додати нову підгрупу в групу

        this.removeStudentFromGroup = this.removeStudentFromGroup.bind(this); // видалення студента з групи
        this.removeStudentFromSubgroup = this.removeStudentFromSubgroup.bind(this); // видалення студента з підгрупи
        this.deleteGroup = this.deleteGroup.bind(this); // видалення групи
        this.deleteSubgroup = this.deleteSubgroup.bind(this); // видалення підгрупи

        this.onSubmitNewSubgroupForm = this.onSubmitNewSubgroupForm.bind(this); // створення нової групи
        this.onGroupChange = this.onGroupChange.bind(this); // заміна ід обраної групи
        this.onSubgroupChange = this.onSubgroupChange.bind(this); // заміна ід обраної підгрупи
        this.onSubgroupBlockChange = this.onSubgroupBlockChange.bind(this); // заміна/обрання/створення нового принципу поділу групи
        this.onSubgroupTitleChange = this.onSubgroupTitleChange.bind(this);// валідація назви нової підгрупи

        this.ChildElementStudentsArrayIntoGroup = React.createRef();
        this.ChildElementStudentsArrayIntoSubgroup = React.createRef();

        this.state = {
            groupId: 0,// ід групи
            subgroupId: 0, // ід підгрупи
            studentsToAddId: [], // масив ід студентів для додання в підгрупу
            studentsWithoutGroup: [], //список студентів без групи
            subgroupTitle: "", // назва нової підгрупи
            subgroupBlockTitle: "", // назва принципу поділу
            subgroupBlocks: [], // масив вже існуючих принципів поділу
            groups: [], // масив усіх груп теперішнього навчального року
            subgroups: [], // масив підгруп обраної групи 
            groupStudents: [], // масив студентів групи
            subgroupStudents: [], // масив студентів підгрупи
        }
    };
    componentDidMount() {
        this.getAllGroups();
        this.getSubgroupBlocks();
        this.getAllStudentsWithoutGroupThisStudyYear();
    }
    async getAllStudentsWithoutGroupThisStudyYear() {
        try {
            const response = await fetch(`${Host}/api/student/getAllStudentsWithoutGroupThisStudyYear`);
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved students: ", data)
                this.setState({
                    studentsWithoutGroup: data
                })
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
    getDatasToSubgroupAdd = () => { // отримання масиву ід обраних студентів із дочірнього компонента
        const childelement = this.ChildElementStudentsArrayIntoSubgroup.current;
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
    getDatasToGroupAdd = () => { // отримання масиву ід обраних студентів із дочірнього компонента
        const childelement = this.ChildElementStudentsArrayIntoGroup.current;
        if (childelement.state.studentsToAdd != null && childelement.state.studentsToAdd <= 0) {
            alert("No one student selected!");
        }
        else {
            const groupId = document.getElementById('group');
            if (groupId == undefined) {
                alert("Group not found");
                return 0;
            }
            this.setState({
                groupId: groupId.value,
                studentsToAddId: childelement.state.studentsToAdd
            },
                () => this.addStudentsIntoGroup())

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
                const data = await response.text();
                window.alert(data);
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
                    this.setState({
                        subgroupId: data[0].id
                    })
                }
                else {
                    this.setState({
                        subgroupStudents: [],
                        subgroupId: 0
                    })
                }

                console.log("recieved subgroups: ", data)
            }
            else {
                this.setState({
                    subgroups: [],
                    subgroupId: 0
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
    async addStudentsIntoGroup() {
        try {
            const datasToSend = {
                groupId: this.state.groupId,
                studentsId: this.state.studentsToAddId
            }
            const response = await fetch(`${Host}/api/student/addStudentsIntoGroup`, {
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
    async removeStudentFromSubgroup(studentId) {
        try {
            const response = await fetch(`${Host}/api/student/deleteStudentFromSubgroup/details?studentId=${studentId}&&subgroupId=${this.state.subgroupId}`, {
                method: "DELETE"
            })
            const data = await response.text();
            window.alert(data);
        }
        catch (e) {
            window.alert(e);
        }
    }
    async removeStudentFromGroup(studentId) {
        try {
            const response = await fetch(`${Host}/api/student/deleteStudentFromGroup/details?studentId=${studentId}&&groupId=${this.state.groupId}`, {
                method: "DELETE"
            })
            const data = await response.text();
            window.alert(data);
        }
        catch (e) {
            window.alert(e);
        }
    }
    async deleteGroup(groupId) {
        try {
            if(groupId<=0){
                alert("Group id can't be <= 0");
                return 0;
            }
            const response = await fetch(`${Host}/api/group/delete/${groupId}`, {
                method: "DELETE"
            })
            if (response.ok === true) {
                window.alert("Group include subgroups deleted successfully");
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
    async deleteSubgroup(subgroupId) {
        try {
            if(subgroupId<=0){
                alert("Subgroup id can't be <= 0");
                return 0;
            }
            const response = await fetch(`${Host}/api/subgroup/delete/${subgroupId}`, {
                method: "DELETE"
            })
            if (response.ok === true) {
                const data = await response.text();
                window.alert(data);
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
                <div className="d-flex flex-row justify-content-between">
                    <div className="form-floating col-md">
                        <select id="group" name="group" className="form-select" onChange={(e) => this.onGroupChange(e)} required>
                            {this.state.groups.map(group =>
                                <option key={"group" + group.groupId} value={group.groupId}>{group.groupTitle}</option>
                            )}
                        </select>
                        <label htmlFor="group">Groups</label>
                    </div>
                    <button className='btn btn-danger' style={{ textSize: "1.25em" }} onClick={() => this.deleteGroup(this.state.groupId)}>Remove selected group</button>
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
                                    <option key={"subgroupBlock_" + subgroupBlock.id} value={subgroupBlock.subgroupBlockTitle} />
                                    // <option key={"subgroupBlock_" + subgroupBlock.id} value={subgroupBlock.subgroupBlockTitle + subgroupBlock.id}>{subgroupBlock.subgroupBlockTitle}</option>
                                )}
                                {/* value='{"values":[subgroupBlock.subgroupBlockTitle,subgroupBlock.subgroupBlockTitle]}' */}
                            </datalist>
                            <input type="text" name="subgroupBlock" autoComplete="on" className="form-control" list="subgroupBlock" onChange={(e) => this.onSubgroupBlockChange(e)} />
                            <label htmlFor="subgroupBlock">Subgroup block</label>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-success" value="Create new subgroup" />
                </form>
                {this.state.studentsWithoutGroup.length > 0 ?
                    <div className='d-flex flex-column'>
                        <div>Students without group:</div>
                        <StudentsTable ref={this.ChildElementStudentsArrayIntoGroup} students={this.state.studentsWithoutGroup}></StudentsTable>
                        <button className='btn btn-primary justify-self-end' onClick={this.getDatasToGroupAdd}>Add selected in group</button>
                    </div>
                    :
                    <></>
                }
                {this.state.groupStudents.length > 0 ?
                    <div className='d-flex flex-column'>
                        <div>Students in group:</div>
                        <StudentsTable ref={this.ChildElementStudentsArrayIntoSubgroup} removeStudentFromGroup={this.removeStudentFromGroup} students={this.state.groupStudents}></StudentsTable>
                        <button className='btn btn-primary justify-self-end' onClick={this.getDatasToSubgroupAdd}>Add selected in subgroup</button>
                    </div>
                    :
                    <></>
                }
                <div>Subroups:</div>
                <div className="d-flex flex-row justify-content-between">
                    <div className="form-floating col-md">
                        <select id="subgroup" name="subgroup" className="form-select" onChange={(e) => this.onSubgroupChange(e)} required>
                            {this.state.subgroups.length > 0 ? this.state.subgroups.map(subgroup =>
                                <option key={"subgroup" + subgroup.id} value={subgroup.id}>{subgroup.title}</option>
                            ) : <></>}
                        </select>
                        <label htmlFor="subgroup">Subgroups</label>
                    </div>
                    <button className='btn btn-danger' style={{ textSize: "1.25em" }} onClick={() => this.deleteSubgroup(this.state.subgroupId)}>Remove subgroup</button>
                </div>
                {this.state.subgroupStudents.length > 0 ?
                    <div>
                        <div>Students in subgroup:</div>
                        <StudentsTable removeStudentFromGroup={this.removeStudentFromSubgroup} students={this.state.subgroupStudents}></StudentsTable>
                    </div>
                    :
                    <></>
                }
            </div>
        )
    }
}
export default FullGroupEditing;