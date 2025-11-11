import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'


@Component({
  selector: 'app-customer-create',
  standalone: false,
  templateUrl: './customer-create.html',
  styleUrl: './customer-create.css'
})
export class CustomerCreate implements OnInit {


  customerForm: FormGroup;

  gpsFormat: string = 'DD';

  isLoading = false;
  isSubmitting = false;




  listings: any[] = [
    { value: 'corporate', text: 'Corporate' },
    { value: 'small_business', text: 'Small Business' },
    { value: 'enterprise', text: 'Enterprise' },
    { value: 'startup', text: 'Startup' },
    { value: 'non_profit', text: 'Non-Profit' }
  ];

  industryTypes: any[] = [
    { value: 'technology', text: 'Technology' },
    { value: 'healthcare', text: 'Healthcare' },
    { value: 'finance', text: 'Finance' },
    { value: 'manufacturing', text: 'Manufacturing' },
    { value: 'retail', text: 'Retail' },
    { value: 'education', text: 'Education' },
    { value: 'hospitality', text: 'Hospitality' }
  ];

  serviceTypes: any[] = [
    { value: 'consulting', text: 'Consulting' },
    { value: 'support', text: 'Support' },
    { value: 'training', text: 'Training' },
    { value: 'implementation', text: 'Implementation' },
    { value: 'maintenance', text: 'Maintenance' },
    { value: 'custom_development', text: 'Custom Development' }
  ];

  assignedToUsers: any[] = [
    { value: 'john_doe', text: 'John Doe' },
    { value: 'jane_smith', text: 'Jane Smith' },
    { value: 'mike_wilson', text: 'Mike Wilson' },
    { value: 'sarah_jones', text: 'Sarah Jones' },
    { value: 'david_brown', text: 'David Brown' }
  ];

  products: any[] = [
    { value: 'product_a', text: 'Product A' },
    { value: 'product_b', text: 'Product B' },
    { value: 'product_c', text: 'Product C' },
    { value: 'product_d', text: 'Product D' },
    { value: 'product_e', text: 'Product E' }
  ];

  zones: any[] = [
    { value: 'north', text: 'North Zone' },
    { value: 'south', text: 'South Zone' },
    { value: 'east', text: 'East Zone' },
    { value: 'west', text: 'West Zone' },
    { value: 'central', text: 'Central Zone' }
  ];

  poRequiredOptions: any[] = [
    { value: 'yes', text: 'Yes' },
    { value: 'no', text: 'No' },
    { value: 'sometimes', text: 'Sometimes' }
  ];

  accountTypes: any[] = [
    { value: 'standard', text: 'Standard' },
    { value: 'premium', text: 'Premium' },
    { value: 'enterprise', text: 'Enterprise' },
    { value: 'vip', text: 'VIP' }
  ];

  regions: any[] = [
    { value: 'region_1', text: 'Region 1' },
    { value: 'region_2', text: 'Region 2' },
    { value: 'region_3', text: 'Region 3' },
    { value: 'region_4', text: 'Region 4' },
    { value: 'region_5', text: 'Region 5' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.customerForm = this.createForm();
  }

  ngOnInit(): void {
    console.log('Customer Create component initialized');
    // Pre-fill form with dummy data for testing
    this.prefillFormWithDummyData();
  }

  /**
   * Pre-fill form with dummy data for testing
   */
  private prefillFormWithDummyData(): void {
    const dummyData = {
      // Company Information
      companyName: 'Tech Solutions Inc.',
      registeredCompanyName: 'Tech Solutions Incorporated',
      prevCompanyName: 'Tech Innovations LLC',
      accountNumber: 'ACC-2024-001',

      // Physical Address
      addressLine1: '123 Main Street',
      addressLine2: 'Suite 500',
      addressLine3: 'Tech Park',
      suburb: 'Downtown',
      city: 'San Francisco',
      area: 'Bay Area',
      country: 'United States',
      postalCode: '94105',

      // Contact Information
      telephone: '+1-555-0123',
      altPhone: '+1-555-0124',
      fax: '+1-555-0125',

      // Dropdown Selections
      listing: ['corporate', 'enterprise'],
      industryType: ['technology', 'finance'],
      serviceType: ['consulting', 'implementation'],

      // Financial Address
      finAddressLine1: '456 Finance Avenue',
      finAddressLine2: 'Floor 10',
      finAddressLine3: 'Financial District',
      finSuburb: 'Financial Center',
      finCity: 'San Francisco',
      finPostalCode: '94104',
      finRegion: 'California',
      finCountry: 'United States',
      finTelephone: '+1-555-0126',
      finFax: '+1-555-0127',
      vat: 'US123456789',
      website: 'https://www.techsolutions.com',

      // Assigned Fields
      assignedTo: 'john_doe',
      product: ['product_a', 'product_c'],
      zone: 'north',

      // Postal Address
      posAddress1: '789 Postal Street',
      posAddress2: 'PO Box 123',
      posAddress3: 'Mail Center',
      posSuburb: 'Postal District',
      posCity: 'San Francisco',
      posZipCode: '94106',
      posRegion: 'California',
      posCountry: 'United States',

      // PO Required Section
      poRequired: 'yes',
      accountType: 'enterprise',
      region: 'region_1',

      // GPS Coordinates (DD Format)
      ddLatitude: '37.7749',
      ddLongitude: '-122.4194',

      // Additional Information
      remark: 'This is a premium enterprise customer with special requirements.',
      flag: 'VIP_CUSTOMER'
    };

    this.customerForm.patchValue(dummyData);
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Company Information
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      registeredCompanyName: [''],
      prevCompanyName: [''],
      accountNumber: [''],

      // Physical Address
      addressLine1: [''],
      addressLine2: [''],
      addressLine3: [''],
      suburb: [''],
      city: [''],
      area: [''],
      country: [''],
      postalCode: [''],

      // Contact Information
      telephone: [''],
      altPhone: [''],
      fax: [''],

      // Dropdown Selections
      listing: [[]],
      industryType: [[]],
      serviceType: [[]],

      // Financial Address
      finAddressLine1: [''],
      finAddressLine2: [''],
      finAddressLine3: [''],
      finSuburb: [''],
      finCity: [''],
      finPostalCode: [''],
      finRegion: [''],
      finCountry: [''],
      finTelephone: [''],
      finFax: [''],
      vat: [''],
      website: [''],

      // Assigned Fields
      assignedTo: [''],
      product: [[]],
      zone: [''],

      // Postal Address
      posAddress1: [''],
      posAddress2: [''],
      posAddress3: [''],
      posSuburb: [''],
      posCity: [''],
      posZipCode: [''],
      posRegion: [''],
      posCountry: [''],

      // PO Required Section
      poRequired: [''],
      accountType: [''],
      region: [''],

      // GPS Coordinates
      gps: [''],

      // DD Format
      ddLatitude: [''],
      ddLongitude: [''],

      // DM Format
      dmNorthSouth: ['N'],
      dmLatitudeDegrees: [''],
      dmLatitudeMinutes: [''],
      dmEastWest: ['E'],
      dmLongitudeDegrees: [''],
      dmLongitudeMinutes: [''],

      // DMS Format
      dmsNorthSouth: ['N'],
      dmsLatitudeDegrees: [''],
      dmsLatitudeMinutes: [''],
      dmsLatitudeSeconds: [''],
      dmsEastWest: ['E'],
      dmsLongitudeDegrees: [''],
      dmsLongitudeMinutes: [''],
      dmsLongitudeSeconds: [''],

      // Additional Information
      remark: [''],
      flag: [''],

      // File Upload
      files: this.fb.array([])
    });
  }

  // Get files from array
  get files(): FormArray {
    return this.customerForm.get('files') as FormArray;
  }

  // Handle file selection
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.files.push(this.fb.control(files[i]));
      }
      console.log('Files selected:', files.length);
    }
  }

  // Removes a file from the form array
  removeFile(index: number): void {
    this.files.removeAt(index);
    console.log('File removed at index:', index);
  }

  // Handles GPS format changes
  onGpsFormatChange(format: string): void {
    this.gpsFormat = format;
    console.log('GPS format changed to:', format);

    // Clear other format fields when switching
    if (format === 'DD') {
      this.clearGpsFields(['DM', 'DMS']);
    } else if (format === 'DM') {
      this.clearGpsFields(['DD', 'DMS']);
    } else if (format === 'DMS') {
      this.clearGpsFields(['DD', 'DM']);
    }
  }

  // Clears GPS field for formats not in use
  private clearGpsFields(formatsToClear: string[]): void {
    formatsToClear.forEach(format => {
      if (format === 'DD') {
        this.customerForm.patchValue({
          ddLatitude: '',
          ddLongitude: ''
        });
      } else if (format === 'DM') {
        this.customerForm.patchValue({
          dmLatitudeDegrees: '',
          dmLatitudeMinutes: '',
          dmLongitudeDegrees: '',
          dmLongitudeMinutes: ''
        });
      } else if (format === 'DMS') {
        this.customerForm.patchValue({
          dmsLatitudeDegrees: '',
          dmsLatitudeMinutes: '',
          dmsLatitudeSeconds: '',
          dmsLongitudeDegrees: '',
          dmsLongitudeMinutes: '',
          dmsLongitudeSeconds: ''
        });
      }
    });
  }

  // Validates GPS coordinates based on format
  validateCoordinates(): void {
    console.log('Validating GPS coordinates in format:', this.gpsFormat);

    switch (this.gpsFormat) {
      case 'DD':
        this.validateDDCoordinates();
        break;
      case 'DM':
        this.validateDMCoordinates();
        break;
      case 'DMS':
        this.validateDMSCoordinates();
        break;
    }
  }

  // Validates decimal degrees format
  private validateDDCoordinates(): void {
    const lat = this.customerForm.get('ddLatitude')?.value;
    const long = this.customerForm.get('ddLongitude')?.value;

    if (lat && long) {
      const latNum = parseFloat(lat);
      const longNum = parseFloat(long);

      if (isNaN(latNum) || latNum < -90 || latNum > 90) {
        console.error('Invalid latitude. Must be between -90 and 90.');
        alert('Invalid latitude. Must be between -90 and 90.');
      } else if (isNaN(longNum) || longNum < -180 || longNum > 180) {
        console.error('Invalid longitude. Must be between -180 and 180.');
        alert('Invalid longitude. Must be between -180 and 180.');
      } else {
        console.log('DD coordinates are valid');
      }
    }
  }

  // Validates degrees minutes format
  private validateDMCoordinates(): void {
    const latDeg = this.customerForm.get('dmLatitudeDegrees')?.value;
    const latMin = this.customerForm.get('dmLatitudeMinutes')?.value;
    const longDeg = this.customerForm.get('dmLongitudeDegrees')?.value;
    const longMin = this.customerForm.get('dmLongitudeMinutes')?.value;

    let isValid = true;

    if (latDeg && latMin) {
      const latDegNum = parseInt(latDeg);
      const latMinNum = parseFloat(latMin);

      if (isNaN(latDegNum) || latDegNum < 0 || latDegNum > 90) {
        console.error('Invalid latitude degrees. Must be between 0 and 90.');
        alert('Invalid latitude degrees. Must be between 0 and 90.');
        isValid = false;
      }

      if (isNaN(latMinNum) || latMinNum < 0 || latMinNum >= 60) {
        console.error('Invalid latitude minutes. Must be between 0 and 60.');
        alert('Invalid latitude minutes. Must be between 0 and 60.');
        isValid = false;
      }
    }

    if (longDeg && longMin) {
      const longDegNum = parseInt(longDeg);
      const longMinNum = parseFloat(longMin);

      if (isNaN(longDegNum) || longDegNum < 0 || longDegNum > 180) {
        console.error('Invalid longitude degrees. Must be between 0 and 180.');
        alert('Invalid longitude degrees. Must be between 0 and 180.');
        isValid = false;
      }

      if (isNaN(longMinNum) || longMinNum < 0 || longMinNum >= 60) {
        console.error('Invalid longitude minutes. Must be between 0 and 60.');
        alert('Invalid longitude minutes. Must be between 0 and 60.');
        isValid = false;
      }
    }

    if (isValid) {
      console.log('DM coordinates are valid');
    }
  }

  // Validates Degrees Minutes Seconds Format
  private validateDMSCoordinates(): void {
    const latDeg = this.customerForm.get('dmsLatitudeDegrees')?.value;
    const latMin = this.customerForm.get('dmsLatitudeMinutes')?.value;
    const latSec = this.customerForm.get('dmsLatitudeSeconds')?.value;
    const longDeg = this.customerForm.get('dmsLongitudeDegrees')?.value;
    const longMin = this.customerForm.get('dmsLongitudeMinutes')?.value;
    const longSec = this.customerForm.get('dmsLongitudeSeconds')?.value;

    console.log('DMS coordinates validation would go here');
    // Similar validation logic as DM but including seconds
  }

  // Handles form Submission
  onSubmit(): void {
    console.log('Form submission started');

    if (this.customerForm.valid) {
      this.isSubmitting = true;

      // Prepare GPS data before submission
      this.prepareGPSData();

      // Log form data for testing
      console.log('Form Data:', this.customerForm.value);
      console.log('Form is valid, submitting...');

      // Simulate API call delay
      setTimeout(() => {
        // Show success message
        alert('Customer created successfully! (This is a demo - no actual API call was made)');

        // Log what would be sent to API
        const formData = this.prepareFormData();
        console.log('FormData that would be sent to API:', formData);

        // Reset form but keep the structure
        this.customerForm.reset();
        this.gpsFormat = 'DD';
        this.files.clear();
        this.isSubmitting = false;

        // Pre-fill with dummy data again for easy testing
        this.prefillFormWithDummyData();

        console.log('Form reset and ready for new entry');

        // In a real app, you would navigate here:
        // this.router.navigate(['/customers']);

      }, 1000);

    } else {
      console.log('Form is invalid');

      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.customerForm);

      // Show which fields are invalid
      this.logInvalidFields();

      alert('Please fill in all required fields correctly.');
    }
  }

  // Prepares GPS data based on selected format
  private prepareGPSData(): void {
    let gpsValue = '';

    switch (this.gpsFormat) {
      case 'DD':
        const lat = this.customerForm.get('ddLatitude')?.value;
        const long = this.customerForm.get('ddLongitude')?.value;
        if (lat && long) {
          gpsValue = `${lat},${long}`;
        }
        break;

      case 'DM':
        const ns = this.customerForm.get('dmNorthSouth')?.value;
        const latDeg = this.customerForm.get('dmLatitudeDegrees')?.value;
        const latMin = this.customerForm.get('dmLatitudeMinutes')?.value;
        const ew = this.customerForm.get('dmEastWest')?.value;
        const longDeg = this.customerForm.get('dmLongitudeDegrees')?.value;
        const longMin = this.customerForm.get('dmLongitudeMinutes')?.value;

        if (latDeg && latMin && longDeg && longMin) {
          gpsValue = `${ns} ${latDeg}° ${latMin}', ${ew} ${longDeg}° ${longMin}'`;
        }
        break;

      case 'DMS':
        const dmsNs = this.customerForm.get('dmsNorthSouth')?.value;
        const dmsLatDeg = this.customerForm.get('dmsLatitudeDegrees')?.value;
        const dmsLatMin = this.customerForm.get('dmsLatitudeMinutes')?.value;
        const dmsLatSec = this.customerForm.get('dmsLatitudeSeconds')?.value;
        const dmsEw = this.customerForm.get('dmsEastWest')?.value;
        const dmsLongDeg = this.customerForm.get('dmsLongitudeDegrees')?.value;
        const dmsLongMin = this.customerForm.get('dmsLongitudeMinutes')?.value;
        const dmsLongSec = this.customerForm.get('dmsLongitudeSeconds')?.value;

        if (dmsLatDeg && dmsLatMin && dmsLatSec && dmsLongDeg && dmsLongMin && dmsLongSec) {
          gpsValue = `${dmsNs} ${dmsLatDeg}° ${dmsLatMin}' ${dmsLatSec}", ${dmsEw} ${dmsLongDeg}° ${dmsLongMin}' ${dmsLongSec}"`;
        }
        break;
    }

    this.customerForm.patchValue({ gps: gpsValue });
    console.log('GPS value prepared:', gpsValue);
  }

  // Prepares FormData for file upload (simulated)
  private prepareFormData(): FormData {
    const formData = new FormData();
    const formValue = this.customerForm.value;

    // Append all form fields except files
    Object.keys(formValue).forEach(key => {
      if (key !== 'files') {
        const value = formValue[key];
        if (Array.isArray(value)) {
          value.forEach(item => formData.append(key, item));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }
    });

    // Append Files
    this.files.controls.forEach((fileControl, index) => {
      formData.append('files', fileControl.value);
    });

    return formData;
  }

  // Marks all form controls as touched to trigger validation messages
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  // Logs invalid field for debugging
  private logInvalidFields(): void {
    Object.keys(this.customerForm.controls).forEach(key => {
      const control = this.customerForm.get(key);
      if (control?.invalid) {
        console.log(`Invalid field: ${key}`, control.errors);
      }
    });
  }

  // Utility method to check if a field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const field = this.customerForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  // Utility method to get error message for a field
  getFieldError(fieldName: string): string {
    const field = this.customerForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'This field is required';
      }
      if (field.errors['minlength']) {
        return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
      }
      // Add more error types as needed
    }
    return '';
  }

  // Resets the form to its initial state
  onReset(): void {
    this.customerForm.reset();
    this.gpsFormat = 'DD';
    this.files.clear();
    console.log('Form completely reset');
  }

  // Method to test form with different dummy data
  testWithDifferentData(): void {
    const testData = {
      companyName: 'Test Company ' + Date.now(),
      registeredCompanyName: 'Test Registered Co.',
      telephone: '+1-555-9999',
      city: 'New York',
      country: 'USA'
    };

    this.customerForm.patchValue(testData);
    console.log('Form populated with test data');
  }


  // Add these methods to your component class
  getFileType(filename: string): string {
    if (!filename) return 'Unknown';

    const extension = filename.split('.').pop()?.toLowerCase();
    const fileTypes: { [key: string]: string } = {
      'pdf': 'PDF',
      'doc': 'Word',
      'docx': 'Word',
      'xls': 'Excel',
      'xlsx': 'Excel',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image',
      'txt': 'Text',
      'zip': 'Archive',
      'rar': 'Archive'
    };

    return fileTypes[extension || ''] || extension?.toUpperCase() || 'File';
  }

  formatFileSize(bytes: number): string {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  goBackToList() {
    this.router.navigate(['/customers']);
  }


}
