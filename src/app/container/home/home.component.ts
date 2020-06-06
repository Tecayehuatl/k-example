import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { Observable } from 'rxjs';
import { GenericValidators } from 'src/app/shared/validators/generic-validators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userForm: FormGroup;
  public countries$: Observable<ICountry>;
  private validator: GenericValidators;
  public formErrors: { [key: string]: any } = {
    name: '',
    surname: '',
    email: '',
    countryId: '',
    gender: '',
    phone: '',
  };

  constructor(
    private fb: FormBuilder,
    public countriesService: CountriesService
  ) {
    this.validator = new GenericValidators(this.formErrors);
  }

  validateControls(): void {
    this.formErrors = this.validator.logValidationErrors(this.userForm);
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      countryId: ['', Validators.required],
      gender: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[(][0-9]{2}[)]{0,1}[-\s0-9]*$/),
        ],
      ],
    });

    this.userForm.valueChanges.subscribe((form) => {
      if (this.userForm.valid) {
        // Implement some nice UI
        alert('Formulario rellenado con éxito');
      }
    });
  }
}
