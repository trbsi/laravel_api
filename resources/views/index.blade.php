@extends('core')

@section('content')
<div class="row">
	<div class="col-sm-12">
		<form ng-submit="submitLogin()">
			<div class="form-group">
				<input type="text" class="form-control input-sm" name="email" ng-model="loginData.email" placeholder="Email">
			</div>
			<div class="form-group">
				<input type="password" class="form-control input-sm" name="password" ng-model="loginData.password" placeholder="Password">
			</div>
			
			<div class="form-group">
				<input type="submit" value="Submit">
			</div>
			
		</form>
	</div>
</div>

@endsection
