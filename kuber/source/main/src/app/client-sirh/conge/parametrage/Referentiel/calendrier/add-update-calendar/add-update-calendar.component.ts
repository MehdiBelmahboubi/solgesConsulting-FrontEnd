import {Component, Inject} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatChip} from "@angular/material/chips";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOptgroup, MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatCheckbox} from "@angular/material/checkbox";
import {StylesService} from "../../../../../../services/stylesService";
import {DayOfWeek} from "../../../../../../models/dayOfWeek.model";
import {Calendar} from "../../../../../../models/calendar.model";
import {CalendarService} from "../../../../../../services/calendar.service";
import {SnackBarService} from "../../../../../../services/snackBar.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-update-calendar',
  standalone: true,
  imports: [MatCard,
    MatCardTitle,
    MatCardContent,
    MatLabel,
    MatSelect,
    MatOptgroup,
    MatHint,
    MatOptionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    MatInput,
    MatFormField,
    MatCardActions,
    MatIconButton,
    MatTooltip,
    MatButton,
    MatError,
    MatIcon,
    MatSuffix,
    NgIf,
    MatChip, MatCheckbox, NgForOf],
  templateUrl: './add-update-calendar.component.html',
  styleUrl: './add-update-calendar.component.scss'
})
export class AddUpdateCalendarComponent {
  newTypeError = '';
  backgroundColorBlue='';
  formGroup!: FormGroup;
  calendar!:Calendar;
  daysOfWeekOptions = Object.values(DayOfWeek);

  constructor(private fb: FormBuilder,
              private stylesService:StylesService,
              private dialogRef:MatDialogRef<AddUpdateCalendarComponent>,
              private calendarService:CalendarService,
              private snackBarService:SnackBarService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initializeForm();
    this.backgroundColorBlue=this.stylesService.getBlueColor();
  }

  initializeForm(): void {
    this.formGroup = this.fb.group({
      code: ['', Validators.required],
      libelle: ['', Validators.required],
      jourFerier: [false, Validators.required],
      Lundi: [false],
      Mardi: [false],
      Mercredi: [false],
      Jeudi: [false],
      Vendredi: [false],
      Samedi: [false],
      Dimanche: [false]
    });
    if (this.data) {
      // Patch form values
      this.formGroup.patchValue({
        code: this.data.code,
        libelle: this.data.libelle,
        jourFerier: this.data.jourFerier
      });
    }
  }
  close() {
    this.dialogRef.close();
  }

  addCalendar() {
    const formValues = this.formGroup.value;

    // Collect selected days of the week
    const selectedDaysOfWeek = this.daysOfWeekOptions.filter(day => formValues[day]);

    const newCalendar = {
      companyId: formValues.companyId,
      code: formValues.code,
      libelle: formValues.libelle,
      jourFerier: formValues.jourFerier,
      daysOfWeek: selectedDaysOfWeek
    };

    const newcalendar2 = { ...this.calendar, ...newCalendar };

    this.calendarService.addCalendar(newcalendar2).subscribe({
      next: () => {
        this.snackBarService.showSuccess('Calendar created successfully!');
        this.close();
      },
      error: (err) => {
        console.error('Error Adding Calendar:', err);
        this.snackBarService.showError(err);
      }
    });
  }
}
