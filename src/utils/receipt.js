import moment from 'moment'
import QRCode from 'qrcode'
import Images from '../img/logo.png'

export const printReceipt = async (services, totalAmount) => {
  const receiptId = Date.now().toString()
  
  try {
    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(JSON.stringify({
      id: receiptId,
      services,
      totalAmount,
      date: moment().format('DD/MM/YYYY'),
      time: moment().format('HH:mm:ss')
    }))

    // Create receipt HTML template
    const receiptTemplate = `
      <html>
        <head>
          <style>
            @page {
              margin: 0;
              size: 80mm auto; /* Width fixed, height auto to fit content */
            }
            html, body {
              margin: 0;
              padding: 0;
              width: 270px; /* Matches 80mm at typical DPI */
              box-sizing: border-box;
            }
            body {
              font-family: Arial;
              padding: 5px; /* Reduced padding */
              min-height: auto; /* Avoid unnecessary height */
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .receipt {
              text-align: center;
              width: 100%;
              font-size: 12px; /* Smaller font for compactness */
            }
            .logo {
              margin: 5px 0; /* Reduced margin */
            }
            .service-item {
              display: flex;
              justify-content: space-between;
              margin: 2px 0; /* Reduced spacing */
            }
            .total {
              border-top: 1px dashed black;
              padding-top: 5px;
              margin-top: 5px;
              display: flex;
              justify-content: space-between;
            }
            .qr-code {
              margin: 5px 0 10px 0; /* 10px bottom space as requested */
            }
            h3 {
              margin: 5px 0; /* Reduced margin */
              font-size: 14px; /* Smaller header */
            }
            div {
              margin: 2px 0; /* Reduced general margins */
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="logo">
              <img src="${Images}" width="80" height="auto" alt="Asatov Clinic Logo"/>
            </div>
            <h3>Asatov Clinic Check</h3>
            
            <div>
              <div>Sana: ${moment().format('DD/MM/YYYY')}</div>
              <div>Vaqt: ${moment().format('HH:mm:ss')}</div>
            </div>

            <div>
              ${services.map(service => `
                <div class="service-item">
                  <span>${service.name}</span>
                  <span>${service.price} so'm</span>
                </div>
              `).join('')}
            </div>

            <div class="total">
              <strong>Jami:</strong>
              <strong>${totalAmount} so'm</strong>
            </div>

            <div class="qr-code">
              <img src="${qrCodeUrl}" width="120" height="120"/>
            </div>
          </div>
        </body>
      </html>
    `

    // Create a new window for printing
    const printWindow = window.open('', '_blank')
    printWindow.document.write(receiptTemplate)
    printWindow.document.close()

    // Wait for images to load
    return new Promise((resolve) => {
      printWindow.onload = () => {
        printWindow.print()
        // Close the print window after a delay
        setTimeout(() => {
          printWindow.close()
          resolve(true)
        }, 500)
      }
    })

  } catch (error) {
    console.error('Printing failed:', error)
    return false
  }
}