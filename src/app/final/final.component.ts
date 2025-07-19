import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
declare var html2pdf: any;

@Component({
  selector: 'app-final',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})

export class FinalComponent implements OnInit {
  imagenPreview: string | ArrayBuffer | null = null;
  opcionesFinalesVisible = true;
  yaGuardado = true;
  invitacion: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:3000/invitaciones/${id}`).subscribe((data: any) => {
      this.invitacion = data;
      this.imagenPreview = data.fotoUrl;
    });
  }

  imprimir() {
    window.print();
  }

  descargarPDF() {
    const element = document.getElementById('invitacion-pdf');
    if (element) {
      html2pdf().from(element).save();
    }
  }

  obtenerEstiloFondo() {
    const tema = this.invitacion?.temaColor;
    const fondoRosa = this.invitacion?.fondoRosa;
    const fondoCeleste = this.invitacion?.fondoCeleste;
    const fondoBeige = this.invitacion?.fondoBeige;

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

    return {};
  }
  enviarPorWhatsapp() {
  const link = window.location.href;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent('¡Te invito! Mirá: ' + link)}`;
  window.open(whatsappUrl, '_blank');
}

enviarPorGmail() {
  const link = window.location.href;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Invitación&body=${encodeURIComponent('¡Te invito! Mirá la invitación acá: ' + link)}`;
  window.open(gmailUrl, '_blank');
}

}

