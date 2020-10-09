/* Customer */
Declare @CustomerId int
Declare @FirstName varchar(30)
Declare @LastName varchar(30)

Declare CustomerCursor CURSOR FOR 
Select * FROM customer 

Open CustomerCursor 
Fetch Next From CustomerCursor Into @CustomerId, @FirstName, @LastName

While(@@FETCH_STATUS = 0)
Begin

	/* Balance of customer */
	Declare @BalanceId decimal(10,2)
	Declare @Total decimal(10,2)
	Declare @Consumed decimal(10,2)
	Declare @Balance_CustomerId int
	Declare BalanceCursor CURSOR FOR 
	Select * From balance WHERE id_customer = @CustomerId

	Open BalanceCursor 
	Fetch Next From BalanceCursor Into @BalanceId, @Total, @Consumed, @Balance_CustomerId
	While(@@FETCH_STATUS = 0)
	Begin
		
		/* Invoice */
		Declare @InvoiceId int
		Declare @InvoiceTotal decimal(10,2)
		Declare @IsPaid decimal(10,2)
		Declare @Invoice_CustomerId int
		Declare InvoiceCursor CURSOR FOR 
		Select * From invoice WHERE id_customer = @CustomerId

		Open InvoiceCursor
		Fetch Next From InvoiceCursor Into @InvoiceId, @InvoiceTotal, @IsPaid, @Invoice_CustomerId
		While(@@FETCH_STATUS = 0)
		Begin

			/* Payments of invoice */
			Declare @PaymentId int
			Declare @Payment_CustomerId int
			Declare @Payment_BalanceId int
			Declare @Payment_InvoiceId int
			Declare @Quantity decimal(10,2)
			Declare PaymentCursor CURSOR FOR 
			Select * From payment WHERE id_customer = @CustomerId and id_balance=@BalanceId and id_invoice = @InvoiceId

			Open PaymentCursor
			Fetch Next From PaymentCursor Into @PaymentId, @Payment_CustomerId, @Payment_BalanceId, @Payment_InvoiceId, @Quantity
			While(@@FETCH_STATUS = 0)
			Begin

				Set @IsPaid = @IsPaid + @Quantity
				Update invoice Set is_paid = @IsPaid Where invoice_id = @InvoiceId

				Set @Total = @Total - @Quantity
				Set @Consumed = @Consumed + @Quantity
				Update balance Set total = @Total, is_consumed = @Consumed Where balance_id = @BalanceId

				/* Fetch next payment */
				Fetch Next From PaymentCursor Into @PaymentId, @Payment_CustomerId, @Payment_BalanceId, @Payment_InvoiceId, @Quantity
			
			End
			Close PaymentCursor
			Deallocate PaymentCursor

			/* Fetch next invoice */
			Fetch Next From InvoiceCursor Into @InvoiceId, @InvoiceTotal, @IsPaid, @Invoice_CustomerId

		End
		Close InvoiceCursor
		Deallocate InvoiceCursor

		/* Fetch next balance */
		Fetch Next From BalanceCursor Into @BalanceId, @Total, @Consumed, @Balance_CustomerId

	End
	Close BalanceCursor
	Deallocate BalanceCursor

	Fetch Next From CustomerCursor Into @CustomerId, @FirstName, @LastName

End
CLOSE CustomerCursor 
DEALLOCATE CustomerCursor