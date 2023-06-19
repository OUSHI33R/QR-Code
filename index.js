$(document).ready(function() {
    $('#type').change(function() {
      var selectedType = $(this).val();
      if (selectedType === 'link') {
        $('#linkForm').show();
        $('#contactForm').hide();
      } else if (selectedType === 'contact') {
        $('#linkForm').hide();
        $('#contactForm').show();
      }
    });

    $('#generateBtn').click(function() {
      var selectedType = $('#type').val();

      $('#qrCodeImage').hide(); // Hide the image initially

      if (selectedType === 'link') {
        var link = $('#link').val();
        if (link.trim() === '') {
          Swal.fire('Error', 'Please enter a valid link', 'error');
          return;
        }

        var qrCodeUrl = 'https://chart.googleapis.com/chart?chs=128x128&cht=qr&chl=' + encodeURIComponent(link);

        // Show loading GIF while generating QR code
        $('#qrCodeImage').attr('src', 'https://i.pinimg.com/originals/6b/67/cb/6b67cb8a166c0571c1290f205c513321.gif').show();

        // Simulate QR code generation delay
        setTimeout(function() {
          $('#qrCodeImage').attr('src', qrCodeUrl).addClass('animate__animated animate__fadeIn');
          Swal.fire('Success', 'QR Code generated!', 'success');
        }, 2000);
      } else if (selectedType === 'contact') {
        var name = $('#name').val();
        var surname = $('#surname').val();
        var phone = $('#phone').val();
        var email = $('#email').val();

        if (name.trim() === '' || surname.trim() === '' || phone.trim() === '' || email.trim() === '') {
          Swal.fire('Error', 'Please fill in all contact details', 'error');
          return;
        }

        var contact = 'BEGIN:VCARD\n' +
          'VERSION:3.0\n' +
          'N:' + surname + ';' + name + ';;;\n' +
          'TEL;TYPE=CELL:' + phone + '\n' +
          'EMAIL:' + email + '\n' +
          'END:VCARD';

        var qrCodeUrl = 'https://chart.googleapis.com/chart?chs=128x128&cht=qr&chl=' + encodeURIComponent(contact);

        // Show loading GIF while generating QR code
        $('#qrCodeImage').attr('src', 'https://i.pinimg.com/originals/6b/67/cb/6b67cb8a166c0571c1290f205c513321.gif').show();

        // Simulate QR code generation delay
        setTimeout(function() {
          $('#qrCodeImage').attr('src', qrCodeUrl).addClass('animate__animated animate__fadeIn');
          Swal.fire('Success', 'QR Code generated!', 'success');
        }, 2000);
      }
    });

    $('#downloadBtn').click(function() {
      var qrCodeUrl = $('#qrCodeImage').attr('src');
      var link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qrcode.png';
      link.click();
    });
  });