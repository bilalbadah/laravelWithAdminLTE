<template>
    <div class="container">
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users Table</h3>

                        <div class="card-tools">
                            <button class="btn btn-success" data-toggle="modal" data-target="#addNewUser"><i
                                    class="fas fa-user-plus"></i> Add New
                            </button>
                        </div>
                    </div>

                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover text-nowrap">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Register At</th>
                                <th>Modify</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.type}}</td>
                                <td>{{user.created_at}}</td>
                                <td>
                                    <a href="#" class="orange"><i class="fa fa-edit "> </i> Edit </a>
                                    <strong>/</strong>
                                    <a href="#" class=" red "><i class="fa fa-trash  "> </i> Delete </a>

                                </td>

                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addNewUser" tabindex="-1" role="dialog" aria-labelledby="addNewUserLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addNewUserLabel">Add New User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createUser">
                        <div class="modal-body">

                            <div class="form-group">
                                <label>Username</label>
                                <input v-model="form.name" type="text" name="name"
                                       placeholder="Name"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>

                            <div class="form-group">
                                <label>Email Address</label>
                                <input v-model="form.email" type="email" name="email"
                                       placeholder="Email Address"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>

                            <div class="form-group">
                                <label>Biography</label>
                                <textarea v-model="form.bio" type="text" name="bio"
                                          placeholder="Short bio for user (Optional)"
                                          class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"
                                          style="resize :none;height :125px">

                            </textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>

                            <div class="form-group">
                                <label>Type</label>
                                <select v-model="form.type" name="type" id="type"

                                        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                    <option value="" disabled selected>Select User Role</option>
                                    <option value="admin">admin</option>
                                    <option value="user">Standard User</option>
                                    <option value="author">Author</option>

                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>

                            <div class="form-group">
                                <label>Email Address</label>
                                <input v-model="form.password" type="password" name="password"
                                       placeholder="Password"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Form from 'vform';

    export default {
        data() {
            return {
                // Take All users from database
                users: {},
                // Create a new form instance
                form: new Form({
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: '',


                })
            }
        },
        methods: {
            loadUser() {
                axios.get("api/user").then(({data}) => (this.users = data.data));
            },
            createUser() {
                this.form.post('api/user');
            }
        },
        mounted() {
            this.loadUser();
        }
    }
</script>
