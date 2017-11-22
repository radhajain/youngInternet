import { Component, ElementRef, OnInit, ViewChild,
	trigger, state, style, transition,
	animate } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { CounselorService } from '../../services/index';
import { SchoolService, school, percreq, gpareq } from '../../services/school.service';
import { StudentService, student } from '../../services/student.service';
import { URLSearchParams, Response, Http } from '@angular/http';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
	const URL = "http://localhost:8080/api/v1/upload";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

	//TODO: Use the below to measure the height of spans and adjust classes accordingly
// var canvas = document.createElement('canvas');
// var ctx = canvas.getContext("2d");
// ctx.font = "11px Arial";        
// var width = ctx.measureText(str).width;
	title = "Uploading file"
	// const URL = "http://localhost:8080/api/v1/upload";
	constructor(
		private _counselorService: CounselorService,
		private _schoolService: SchoolService, 
		private _studentService: StudentService,
		private _http: Http, 
		private _activatedRoute: ActivatedRoute ) {
		//formgroup on LANDING
	}

	dssSettingsSelected: boolean = true;
	ciSettingsSelected: boolean = false;
	ppSettingsSelected: boolean = false;	
	pSettingsSelected: boolean = false;
	ciTopAdjacentSelected: boolean = true;
	ppTopAdjacentSelected: boolean = false;	
	pTopAdjacentSelected: boolean = false;
	pBottomAdjacentSelected: boolean = false;
	ssTopAdjacentSelected: boolean = false;
	uBottomAdjacentSelected: boolean = true;
	dssBottomAdjacentSelected: boolean = false;
	ciBottomAdjacentSelected: boolean = false;

	allSelectionsAndAdjacenciesFalse() {
		this.dssSettingsSelected = false;
		this.ciSettingsSelected = false;
		this.ppSettingsSelected = false	
		this.pSettingsSelected = false;
		this.ciTopAdjacentSelected = false;
		this.ppTopAdjacentSelected = false	
		this.pTopAdjacentSelected = false;
		this.pBottomAdjacentSelected = false;
		this.ssTopAdjacentSelected = false;
		this.dssBottomAdjacentSelected = false;
		this.ciBottomAdjacentSelected = false;
		this.uBottomAdjacentSelected = false;
	}
	selectDss() {
		this.allSelectionsAndAdjacenciesFalse();
		this.uBottomAdjacentSelected = true;
		this.ciTopAdjacentSelected = true;
		this.dssSettingsSelected = true;
	}

	selectCi() {
		this.allSelectionsAndAdjacenciesFalse();	
		this.dssBottomAdjacentSelected = true;
		this.pTopAdjacentSelected = true;
		this.ciSettingsSelected = true;
	}

	selectP() {
		this.allSelectionsAndAdjacenciesFalse();
		this.ppTopAdjacentSelected = true;
		this.ciBottomAdjacentSelected = true;
		this.pSettingsSelected = true;
	}

	selectPp() {	
		this.allSelectionsAndAdjacenciesFalse();
		this.pBottomAdjacentSelected = true;
		this.ssTopAdjacentSelected = true;
		this.ppSettingsSelected = true;
	}


	ngOnInit() {
		this._schoolService.getSchools().subscribe(result => {
			this.schools = [];
			for (var i = 0; i < result['data'].length; i++) {
				this.schools.push(result['data'][i])
			}
			this.fillDummySchoolData()
		})
		this._studentService.getStudents().subscribe(result => {
			for (var i = 0; i < result['data'].length; i++) {
				this.students.push(result['data'][i])
			}
			if (this.students.length == 0) {
				this.uploadButtonDisabled = false;
			} else {
				this.fillDummyStudentData()
			}
		})
		this._studentService.getStarred(0).subscribe(result => {
			console.log(result);
		});
	}
	
	uploadButtonDisabled = true;
	uploadFile() {
		console.log('We hit it')
	}

	fillDummySchoolData() {

	}

	fillDummyStudentData() {
		this.selectedStudents.push(this.students[0])
		this.selectedStudents.push(this.students[25])
		this.selectedStudents.push(this.students[51])	

	}

	// @ViewChild('studentBox') students;
	schoolList: boolean = false;
	studentList: boolean = false;
	switchSchoolList() {
		this.studentList = false;
		console.log(this.schoolList)
		this.schoolList = !this.schoolList
		console.log(this.schoolList)
	}
	switchStudentList() {
		this.schoolList = false;
		console.log(this.studentList)
		this.studentList = !this.studentList
		console.log(this.studentList)
	}

	schools: school[] = [];
	students: student[] = [];

	selectedStudents: student[] = [];
	selectedSchools: school[] = [];
	studentsToNotify: student[] = [];
	notificationsToSend = [];
	batchResults = null;

	perc: number = 0;
	act: number = 0;
	sat: number = 0;
	gpa: number = 0;
	localPerc: number = 0;
	localAct: number = 0;
	localSat: number = 0;
	localGpa: number = 0;
	results = [];
	searchDispatched: boolean = false;

	selectSchool(school: school) {
		for (var i = 0, s; s = this.selectedSchools[i]; i++) {
			if (s.intid === school.intid) {
				this.selectedSchools.splice(i, 1);
				return;
			}
		}
		this.selectedSchools.push(school);
	}

	unSelectByIndex(schoolIndex: number) {
		this.selectedSchools.splice(schoolIndex, 1);
	}

	selectStudent(student: student) {
		for (var s in this.selectedStudents) {
			if (this.selectedStudents[s].id === student.id) {
				this.selectedStudents.splice(parseInt(s), 1);
				return;
			}
		}
		this.selectedStudents.push(student);
	}
	unSelectStudentByIndex(studentIndex: number) {
		this.selectedStudents.splice(studentIndex, 1);
		// this.selectedAdmittedBooleans.splice(studentIndex, 1);
	}

	unSelectStudent(student: student) {
		var studentIndex = this.selectedStudents.indexOf(student);
		this.unSelectStudentByIndex(studentIndex);
	}

	getStarredSchools(studentId: number) {
		// return this._schoolService.getStarred()
		// .subscribe(result => {
		// 	for (var part in result) {
		// 		this.starredSchools.push(result[part]);
		// 	}
		// });
	}

	addStudentToTBNotified(student: student, schoolId: number) {
		// this.studentsToNotify.push(student)
		if (this.notificationsToSend.length == 0) {
			console.log("we are in")
			this.notificationsToSend.push({student: student, school: [schoolId]})
		}
		else {
			for (var i = 0; i < this.notificationsToSend.length; i++) {
				if(this.notificationsToSend[i]['student'] == student) {
					for (var j = 0; j < this.notificationsToSend[i].school.length; j++) {
						if (this.notificationsToSend[i].school[j] == schoolId) {
							return
						} else {		
							var localCopyOfCurrentNotifications = this.notificationsToSend[i].school
							localCopyOfCurrentNotifications.push(schoolId)
							this.notificationsToSend[i].school = localCopyOfCurrentNotifications
							console.log(this.notificationsToSend)
						}
						return
					}
					var localCopyOfCurrentNotifications = this.notificationsToSend[i]['school']
					localCopyOfCurrentNotifications.push(schoolId)
					this.notificationsToSend[i].school = localCopyOfCurrentNotifications
					return
				} 
			}
			this.notificationsToSend.push({
						student: student, 
						school: [schoolId]
					})
		}
		console.log(this.notificationsToSend)
	}

	//here we pass the index for ease
	removeNotificationFromTBNotified(student: number, schoolId: number) {	
		console.log(student, schoolId)
		console.log(this.notificationsToSend)
		for (var i = 0; i < this.notificationsToSend.length; i++) {
			for (var j = 0; j < this.notificationsToSend[i].school.length; j++) {
				if (this.notificationsToSend[i].student.id == student && this.notificationsToSend[i].school[j] == schoolId) {
					this.notificationsToSend[i].school.splice(j, 1)
					if (this.notificationsToSend[i].school.length == 0) {
						this.notificationsToSend.splice(i, 1)
					}
					console.log(this.notificationsToSend)
					return
				} 
			}
		}
	}

	public pruneComparison = () => {
		if (this.perc) {
			//this.localPerc = this.perc.nativeElement.value;
		}
		if (this.gpa) {
			//this.localGpa = this.gpa.nativeElement.value;
		}
		if (this.sat) {
			//this.localSat = this.sat.nativeElement.value;
		}
		if (this.act) {
		//	this.localAct = this.act.nativeElement.value;
		}
		// var loc = this.selectedAdmittedBooleans
		// for (var i in loc) {
			// this.selectedAdmittedBooleans[i] = this.bucketize(parseInt(i)) 	!= -1;
		// }
	}

	filtering :boolean = false;

	hide() {
		this.filtering = false;
	}

	over() {
		this.filtering = true;
	}

	hackASU() {
		for (var i = 0; i < this.selectedSchools.length; i++) {
		}
	}

	batchSearch() {
		this.hackASU()
		this._counselorService.dispatchBatchQuery(this.selectedSchools, this.selectedStudents).subscribe((result) => {
			//loop through selected schools to sort students by school they are admitted to
			var localResults = {};
			for (var s = 0, localSchool; localSchool = this.selectedSchools[s]; s++) {
				localResults[localSchool.intid] = [];
			}

				//loop through student results
			for (var i = 0; i < result['data'].length; i++) {
				if (result['data'][i] == null ) continue;
				for (var j = 0; j < result['data'][i].length; j++) {
					localResults[result['data'][i][j]].push(i);
				}
			}
			this.batchResults = localResults;
			console.log(this.batchResults);
			console.log(this.selectedSchools);

		})
	}

	clearSelections() {
		this.batchResults = [];
		this.notificationsToSend = [];
		this.selectedStudents = [];
		this.selectedSchools = [];
	}
	//implement cycling through the different auto admission criteria
	//for each school so students can see the different criteria they can meet in order to get in
	//dispay simply: whether youre in and the key

	keys(object: {}) {
	    return Object.keys(object);
  }

	// bucketize(index: number): number {
	// 	var admittedIndex: number = -1;
	// 	for (var percReq in this.selectedSchools[index].percs) {
	// 		if (this.localPerc < this.selectedSchools[index].percs[percReq].perc &&
	// 			(this.selectedSchools[index].percs[percReq].sat < this.localSat ||
	// 				this.selectedSchools[index].percs[percReq].act < this.localAct)) {
	// 			admittedIndex = parseInt(percReq);
	// 			break;
	// 		}
	// 	}
	// 	for (var gpaReq in this.selectedSchools[index].gpas) {
	// 		if (this.localGpa > this.selectedSchools[index].gpas[gpaReq].gpa &&
	// 			(this.selectedSchools[index].gpas[gpaReq].sat < this.localSat ||
	// 				this.selectedSchools[index].gpas[gpaReq].act < this.localAct)) {
	// 			admittedIndex = parseInt(gpaReq) + this.selectedSchools[index].percs.length;
	// 			break;
	// 		}
	// 	}
	// 	return admittedIndex;
	// }
}
