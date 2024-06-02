import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ResourceType } from '../domain/resources.model';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResourceTypeService } from '../domain/resource-type.service';
import { MatOptionModule } from '@angular/material/core';

interface SelectOption {
  readonly label: string;
  readonly value: ResourceType;
}

@Component({
  selector: 'deskly-add-resources-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-resources-modal.component.html',
  styleUrl: './add-resources-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResourceTypeService]
})
export class AddResourcesModalComponent implements OnInit {
  private readonly INITIAL_TYPE = ResourceType.HOT_DESK;

  private readonly DESK_METADATA = this.formBuilder.group({
    manufacturer: this.formBuilder.nonNullable.control('', [
      Validators.required
    ]),
    model: this.formBuilder.nonNullable.control('')
  });

  private readonly ROOM_METADATA = this.formBuilder.group({
    capacity: this.formBuilder.nonNullable.control(1, [
      Validators.required,
      Validators.min(1)
    ])
  });

  private readonly DEVICE_METADATA = this.formBuilder.group({
    manufacturer: this.formBuilder.nonNullable.control('', [
      Validators.required
    ]),
    model: this.formBuilder.nonNullable.control('', [Validators.required]),
    serialNumber: this.formBuilder.nonNullable.control('', [
      Validators.required
    ])
  });

  readonly options: SelectOption[] = Object.values(ResourceType).map(
    (type) => ({ value: type, label: type.replaceAll('_', ' ') })
  );

  readonly formRecord: FormRecord = this.formBuilder.record({
    quantity: this.formBuilder.nonNullable.control(1, [
      Validators.required,
      Validators.min(1)
    ]),
    type: this.formBuilder.nonNullable.control(this.INITIAL_TYPE),
    name: this.formBuilder.nonNullable.control('', [Validators.required]),
    description: this.formBuilder.nonNullable.control(''),
    photos: this.formBuilder.nonNullable.control(''),
    metadata: this.DESK_METADATA
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly destroyRef: DestroyRef,
    private readonly resourceTypeService: ResourceTypeService
  ) {}

  ngOnInit(): void {
    this.type$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((type) => {
      const controlName = 'metadata';
      this.formRecord.removeControl(controlName);
      if (this.resourceTypeService.isRoom(type)) {
        this.formRecord.addControl(controlName, this.ROOM_METADATA);
      } else if (this.resourceTypeService.isAudioVideoDevice(type)) {
        this.formRecord.addControl(controlName, this.DEVICE_METADATA);
      } else {
        this.formRecord.addControl(controlName, this.DESK_METADATA);
      }
    });
  }

  private readonly type$ = (
    this.formRecord.controls['type'] as FormControl<ResourceType>
  ).valueChanges.pipe(startWith(this.INITIAL_TYPE));

  readonly isResourceTypeRoom$: Observable<boolean> = this.type$.pipe(
    map((type) => this.resourceTypeService.isRoom(type))
  );

  readonly isResourceTypeAudioVideoDevice$: Observable<boolean> =
    this.type$.pipe(
      map((type) => this.resourceTypeService.isAudioVideoDevice(type))
    );

  readonly isResourceTypeObject$: Observable<boolean> = this.type$.pipe(
    map((type) => this.resourceTypeService.isObject(type))
  );

  get metadataFormGroup(): FormGroup {
    return this.formRecord.controls['metadata'] as FormGroup;
  }
}
