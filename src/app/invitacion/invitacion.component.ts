import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-invitacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.css']
})
export class InvitacionComponent {
  invitacionForm: FormGroup;
  imagenPreview: string | ArrayBuffer | null = null;

  opcionesFinalesVisible = false;
  yaGuardado = false;
  invitacion: any;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {


    this.invitacionForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      imagen: [''],
      salon: ['', Validators.required],
      dia: ['', Validators.required],
      hora: ['', Validators.required],
      horaHasta: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      temaColor: ['rosa', Validators.required],
      fondoRosa: [''],
      fondoCeleste: [''], 
      fondoBeige: [''],
      fondoDibujitos:['']


    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imagenPreview = reader.result;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  guardarInvitacion() {
  const confirmar = confirm("Una vez guardada no podrás modificarla. ¿Deseás continuar?");

  if (confirmar) {
    const datos = this.invitacionForm.value;
    datos.fotoUrl = this.imagenPreview;

    this.http.post<any>('https://invitaciones-back-t15x.onrender.com/invitaciones', datos).subscribe({
      next: (respuesta) => {
        this.yaGuardado = true;
        this.opcionesFinalesVisible = true;
        alert('¡Invitación guardada!');
        // Redirigir a /final con el ID devuelto
        this.router.navigate(['/final', respuesta.id], { queryParams: { admin: true } });

      },
      error: () => {
        alert('Error al guardar la invitación.');
      }
    });
    console.log('DATOS ENVIADOS:', datos);

  }
}


esCampoInvalido(campo: string): boolean {
  const control = this.invitacionForm.get(campo);
  return control?.touched && control?.invalid || false;
}
get temaSeleccionado() {
  return this.invitacionForm.get('temaColor')?.value;
}

obtenerEstiloFondo() {
  const tema = this.invitacionForm.get('temaColor')?.value;
  const fondoRosa = this.invitacionForm.get('fondoRosa')?.value;
  const fondoCeleste = this.invitacionForm.get('fondoCeleste')?.value;
  const fondoBeige= this.invitacionForm.get('fondoBeige')?.value;
  const fondoDibujitos = this.invitacionForm.get('fondoDibujitos')?.value;

  if (tema === 'rosa' && fondoRosa) {
    return {
      'background-image': `url('assets/fondos/${fondoRosa}')`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat'
    };
  }

  if (tema === 'celeste' && fondoCeleste) {
    return {
      'background-image': `url('assets/fondos/${fondoCeleste}')`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat'
    };
  }

  if (tema === 'beige' && fondoBeige) {
    return {
      'background-image': `url('assets/fondos/${fondoBeige}')`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat'
    };
  }
  if (tema === 'dibujitos' && fondoDibujitos) {
    return {
      'background-image': `url('assets/fondos/${fondoDibujitos}')`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat'
    };
  }

  return {}; // otros temas sin fondo imagen
}
irAFinal(): void {
  this.router.navigate(['/final']);
}

seleccionarFondoRosa(fondo: string): void {
  this.invitacionForm.get('fondoRosa')?.setValue(fondo);
}

getGoogleMapsUrl(): string {
  const direccion = this.invitacionForm?.value?.direccion;
  if (!direccion) return '';
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion);
}


}
